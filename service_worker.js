import { autoAnalyze } from './src/scripts/autoAnalyze';
let pollFlagActive = false;

const processMarketplace = async () => {
  const loop = async () => {
    if (!pollFlagActive) return;
    let [tab] = await chrome.tabs.query({ active: true });
    console.log("processing: "+tab.id);
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
  const delay = Math.random() * (20_000-5000) + 1000;
  setTimeout(processMarketplace, delay);
  loop();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action==="startPoll") {
    pollFlagActive = true;
    processMarketplace();
  } else if (message.action==="endPoll") {
    pollFlagActive = false;
  }
})




