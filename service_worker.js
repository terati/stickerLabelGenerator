import { autoAnalyze } from './src/scripts/autoAnalyze';

const processMarketplace = async () => {
  let res = await chrome.storage.local.get("enabled");
  if (!res.enabled) return;
  // console.log(enabled);
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const day = now.getDay();
  if (day==0) {
    chrome.storage.local.set({"enabled": false});
    return;
  }
  // if (hour<=10 && minute<22) return;
  // if (hour>=12 && minute>18) return;
  const loop = async () => {
    let [tab] = await chrome.tabs.query({ active: true  });
    // , currentWindow: true
    // console.log("processing: "+tab.id);
    if (!tab.url || !tab.url.startsWith("https://mrx.matchrx.com")) return;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: autoAnalyze,
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("injection failed: ", chrome.runtime.lastError);
      } else {
        console.log("injection succeeded: ", results);
      }
    });
  }
  const delay = Math.random() * (15_000-10_000) + 1000;
  setTimeout(processMarketplace, delay);
  loop();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("hite");
  if (message.action==="startPoll") {
    processMarketplace();
  } else if (message.action==="endPoll") {
    chrome.storage.local.set({"enabled": false});
  }
})




