// Controlled before/after browser workload. Keep CPU/viewport settings identical.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
(async function () {
  const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe', headless: true });
  const output = 'tmp/performance';
  fs.mkdirSync(output, { recursive: true });
  const results = [];
  for (const viewport of [{width:390,height:844},{width:1440,height:1000}]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1.5 });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate:4 });
    await cdp.send('Performance.enable');
    await page.addInitScript(() => {
      window.__work = { canvasClears:0, longTasks:[] };
      const original = CanvasRenderingContext2D.prototype.clearRect;
      CanvasRenderingContext2D.prototype.clearRect = function () {
        window.__work.canvasClears += 1;
        return original.apply(this, arguments);
      };
      new PerformanceObserver(list => list.getEntries().forEach(entry => window.__work.longTasks.push(entry.duration))).observe({type:'longtask', buffered:true});
    });
    await cdp.send('Tracing.start', { categories:'devtools.timeline,disabled-by-default-devtools.timeline', transferMode:'ReturnAsStream' });
    await page.goto(process.env.SITE_URL || 'http://127.0.0.1:4173/', {waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);
    const idleStart = await cdp.send('Performance.getMetrics');
    const clearsBeforeIdle = await page.evaluate(() => window.__work.canvasClears);
    await page.waitForTimeout(2000);
    const idleEnd = await cdp.send('Performance.getMetrics');
    const idleClears = await page.evaluate(() => window.__work.canvasClears);
    await page.evaluate(() => new Promise(resolve => {
      const start = performance.now();
      function scroll(time) {
        const progress = Math.min((time-start)/1800,1);
        window.scrollTo({top:progress*2000,behavior:'instant'});
        if(progress<1) requestAnimationFrame(scroll); else resolve();
      }
      requestAnimationFrame(scroll);
    }));
    await page.locator('.calendar-trigger').click();
    await page.waitForTimeout(600);
    await page.keyboard.press('Escape');
    await page.locator('.closing-actions [data-open="blessing-dialog"]').click();
    await page.locator('#shower-blessings').click();
    await page.waitForTimeout(3400);
    await page.keyboard.press('Escape');
    const metrics = await cdp.send('Performance.getMetrics');
    const sample = await page.evaluate(() => ({
      longTasks:window.__work.longTasks,
      canvasClears:window.__work.canvasClears,
      resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').pop(),bytes:r.encodedBodySize})),
      paints:performance.getEntriesByType('paint').map(p=>({name:p.name,time:p.startTime}))
    }));
    const tracingComplete = new Promise(resolve => cdp.once('Tracing.tracingComplete', resolve));
    await cdp.send('Tracing.end');
    const { stream } = await tracingComplete;
    let trace = '';
    while(true) {
      const data=await cdp.send('IO.read',{handle:stream});
      trace+=data.base64Encoded ? Buffer.from(data.data,'base64').toString() : data.data;
      if(data.eof) break;
    }
    await cdp.send('IO.close',{handle:stream});
    fs.writeFileSync(path.join(output,(process.env.PERF_LABEL||'sample')+'-'+viewport.width+'-trace.json'),trace);
    const events = JSON.parse(trace).traceEvents;
    const sum = name => events.filter(e=>e.name===name&&e.ph==='X').reduce((v,e)=>v+(e.dur||0)/1000,0);
    const getMetric = (list,name) => list.metrics.find(m=>m.name===name)?.value||0;
    results.push({
      viewport:viewport.width,cpuSlowdown:4,
      idleCanvasClears:idleClears-clearsBeforeIdle,
      idleTaskMs:Math.round((getMetric(idleEnd,'TaskDuration')-getMetric(idleStart,'TaskDuration'))*1000),
      longTaskCount:sample.longTasks.length,totalLongTaskMs:Math.round(sample.longTasks.reduce((a,b)=>a+b,0)),
      paintMs:Math.round(sum('Paint')),rasterMs:Math.round(sum('RasterTask')),
      totalTaskMs:Math.round(getMetric(metrics,'TaskDuration')*1000),
      totalScriptMs:Math.round(getMetric(metrics,'ScriptDuration')*1000),
      fontBytes:sample.resources.filter(r=>/\.(ttf|woff2)$/.test(r.name)).reduce((sum,r)=>sum+r.bytes,0),
      resourceBytes:sample.resources.reduce((sum,r)=>sum+r.bytes,0),
      ...sample
    });
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(output,(process.env.PERF_LABEL||'sample')+'.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(({resources,longTasks,...result})=>result),null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
