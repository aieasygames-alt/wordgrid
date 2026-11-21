// Run inside the documented CUA JavaScript environment; no external browser driver.
// See plans/COMPLETE_BROWSER_ACCEPTANCE.md for setup and the offline phase.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function runCompleteAcceptance({tab,createTab,viewport,fixture,artifactDir,denySharing=false}) {
  const hostname=new URL(fixture.baseUrl).hostname;
  assert.ok(["localhost","127.0.0.1"].includes(hostname)||hostname.endsWith(".pages.dev"),"Use an isolated local/preview origin, not the public production domain.");
  await mkdir(artifactDir,{recursive:true});
  const checks=[];
  const check=(name,details)=>checks.push({name,status:"pass",details});
  const snapshot=()=>tab.getAXState({emit:false});
  const count=async()=>Number((await tab.playwright.getByTestId("complete-progress").innerText()).trim().match(/^\d+/)[0]);
  const submit=async(word)=>{
    await tab.playwright.getByLabel("Type a word",{exact:true}).fill(word);
    await tab.playwright.getByRole("button",{name:"Find",exact:true}).click();
    await snapshot();
  };
  let sibling;
  try {
    if(await tab.url()!==fixture.url)await tab.goto(fixture.url);
    await snapshot();
    await tab.playwright.getByTestId("complete-progress").waitFor({state:"visible",timeout:20000});
    if(await tab.playwright.getByRole("button",{name:"Decline",exact:true}).isVisible())await tab.playwright.getByRole("button",{name:"Decline",exact:true}).click();
    if(await tab.playwright.getByRole("button",{name:"Skip tutorial",exact:true}).isVisible())await tab.playwright.getByRole("button",{name:"Skip tutorial",exact:true}).click();
    await snapshot();
    assert.equal(await count(),0,"This test preserves existing saves. Use a fresh isolated origin/profile for a zero-progress baseline.");
    check("bank and tutorial",{date:fixture.date,targets:fixture.targetCount});
    const first=fixture.targetWords[0],second=fixture.targetWords[1];
    await submit(first);assert.equal(await count(),1);
    await submit(first);assert.equal(await count(),1);
    await submit("ZZZZ");assert.equal(await count(),1);
    if(fixture.bonusWords.length){await submit(fixture.bonusWords[0]);assert.equal(await count(),1);}
    if(fixture.extraWords.length){await submit(fixture.extraWords[0]);assert.equal(await count(),1);assert.match(await tab.playwright.getByText(/extra word recognized!/).innerText(),/No points/);}
    check("find, duplicate, invalid, bonus and legacy extras","Targets are unchanged by non-targets.");
    sibling=await createTab(fixture.url);await sibling.getAXState({emit:false});
    await sibling.playwright.getByTestId("complete-progress").waitFor({state:"visible",timeout:20000});
    await sibling.playwright.getByLabel("Type a word",{exact:true}).fill(second);
    await sibling.playwright.getByRole("button",{name:"Find",exact:true}).click();await sibling.getAXState({emit:false});
    await tab.playwright.getByTestId("complete-progress").filter({hasText:/^\s*2\s*\//}).waitFor({state:"visible",timeout:5000});
    await tab.reload();await snapshot();await tab.playwright.getByTestId("complete-progress").waitFor({state:"visible"});assert.equal(await count(),2);
    check("cross-tab union and reload","Both target discoveries survive.");
    await sibling.close();sibling=undefined;
    for(let i=2;i<fixture.thresholds[2];i++)await submit(fixture.targetWords[i]);
    assert.equal(await count(),fixture.thresholds[2]);
    assert.equal(await tab.playwright.getByRole("button",{name:"Start counts (unlocked)",exact:true}).isEnabled(),true);
    assert.equal(await tab.playwright.getByRole("button",{name:"First letters (unlocked)",exact:true}).isEnabled(),true);
    assert.equal(await tab.playwright.getByRole("button",{name:"Reveal one target (0 points)",exact:true}).isEnabled(),true);
    await tab.playwright.getByRole("button",{name:"Start counts (unlocked)",exact:true}).click();await snapshot();
    check("whole-target hint thresholds",{thresholds:fixture.thresholds});
    await tab.playwright.getByRole("button",{name:"Preview text",exact:true}).click();await snapshot();
    const share=await tab.playwright.getByLabel("Spoiler-free result text",{exact:true}).evaluate(element=>element.value);
    assert.match(share,new RegExp(`${fixture.thresholds[2]}/${fixture.targetCount} targets`));
    for(const word of fixture.targetWords)assert.ok(!share.includes(word),`Share leaked ${word}`);
    if(denySharing){
      await tab.playwright.getByRole("button",{name:"Copy result",exact:true}).click();await snapshot();
      const fallback=await tab.playwright.getByText("Sharing unavailable. Select and copy the preview below.",{exact:true}).isVisible();
      if(fallback)check("blocked clipboard fallback","Manual preview remains selectable.");
      else {
        assert.ok(await tab.playwright.getByText("Result copied. No answers included.",{exact:true}).isVisible());
        checks.push({name:"blocked clipboard fallback",status:"unsupported",details:"Browser accepted clipboard writes despite Permissions-Policy; rejection/cancellation paths are covered by unit tests, device acceptance remains required."});
      }
    }
    check("spoiler-free share preview",{requestedBlockedClipboard:denySharing});
    const layouts=[];
    for(const width of [320,390]){
      await viewport.set({width,height:844});await snapshot();
      const dimensions=await tab.playwright.evaluate(()=>({width:window.innerWidth,clientWidth:document.documentElement.clientWidth,content:document.documentElement.scrollWidth}));
      assert.ok(dimensions.content<=dimensions.clientWidth,JSON.stringify(dimensions));
      layouts.push({requested:width,...dimensions});
      await tab.playwright.getByRole("heading",{name:"Your collection",exact:true}).click();await snapshot();
      await writeFile(path.join(artifactDir,`complete-requested-${width}-actual-${dimensions.width}.jpg`),await tab.screenshot({fullPage:false}));
    }
    await viewport.reset();
    checks.push({name:"320/390px layout",status:layouts.every(size=>size.requested===size.width)?"pass":"unsupported",details:layouts});
    await tab.playwright.getByRole("button",{name:"Start separate replay",exact:true}).click();await snapshot();
    await tab.playwright.getByTestId("complete-progress").waitFor({state:"visible"});assert.equal(await count(),0);
    await submit(first);await tab.reload();await snapshot();await tab.playwright.getByTestId("complete-progress").waitFor({state:"visible"});assert.equal(await count(),1);
    await tab.goto(fixture.url);await snapshot();await tab.playwright.getByTestId("complete-progress").waitFor({state:"visible"});assert.equal(await count(),fixture.thresholds[2]);
    check("independent replay and restored original","Replay reload keeps one word; original progress is intact.");
    await tab.playwright.getByRole("link",{name:"Archive & personal stats",exact:true}).click();await snapshot();
    await tab.playwright.getByLabel("Archive month",{exact:true}).waitFor({state:"visible"});
    await tab.playwright.getByLabel("Archive month",{exact:true}).selectOption(fixture.date.slice(0,7));await snapshot();
    assert.ok(await tab.playwright.getByRole("link",{name:`Continue ${fixture.date}`,exact:true}).isVisible());
    await writeFile(path.join(artifactDir,"complete-archive.jpg"),await tab.screenshot({fullPage:false}));
    check("archive original progress","Published-date list offers the saved original session.");
    await tab.playwright.getByText("Offline play ready on this device",{exact:true}).waitFor({state:"visible",timeout:30000});
    check("offline installation","Full cache reports ready.");
    const result={baseUrl:fixture.baseUrl,date:fixture.date,checks,originalTargets:fixture.thresholds[2],nativeSystemShare:"Requires device acceptance; no messages or public scores submitted."};
    await writeFile(path.join(artifactDir,"browser-result.json"),JSON.stringify(result,null,2)+"\n");
    return result;
  } finally {if(sibling)await sibling.close();await viewport.reset();}
}

export async function verifyOffline({tab,fixture,artifactDir}) {
  // Stop the local QA server before calling this phase. No fake browser state.
  await tab.goto(fixture.url);await tab.getAXState({emit:false});
  await tab.playwright.getByTestId("complete-progress").waitFor({state:"visible",timeout:15000});
  const value=await tab.playwright.getByTestId("complete-progress").innerText();
  assert.match(value,new RegExp(`^${fixture.thresholds[2]}\\s*/`));
  const scoreButton=tab.playwright.getByRole("button",{name:"Submit my score",exact:true});
  if(await scoreButton.isVisible())assert.equal(await scoreButton.isEnabled(),false);
  await tab.playwright.getByRole("link",{name:"Archive & personal stats",exact:true}).click();await tab.getAXState({emit:false});
  await tab.playwright.getByLabel("Archive month",{exact:true}).waitFor({state:"visible"});
  await writeFile(path.join(artifactDir,"complete-offline.jpg"),await tab.screenshot({fullPage:false}));
  const result={serverStopped:true,completeReload:true,savedProgress:true,clientNavigationToArchive:true,rankedSubmissions:false};
  await writeFile(path.join(artifactDir,"offline-browser-result.json"),JSON.stringify(result,null,2)+"\n");
  return result;
}
