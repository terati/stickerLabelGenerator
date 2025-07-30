import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { scrapeInvoice } from './scripts/invoiceScrape'

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState<any>();

  // const [enabled, setEnabled] = useState<boolean>(await chrome.storage.local.get("enabled");); 

  const toggleScript = () => {

    // if (enabled) {
    //   chrome.runtime.sendMessage({ action: "endPoll" });
    // } else {
    //   chrome.runtime.sendMessage({ action: "startPoll" });
    // }
    // setEnabled(prev => !prev);
    
    // processMarketplace();
    // console.log("test");
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   console.log(tabs);
    //   if (tabs[0].id) chrome.runtime.sendMessage({
    //     action: enabled ? "STOP" : "START"
    //   }, () => {
    //     console.log("msg was sent");
    //   })
    // })
  }

  // const scrapePage = async () => {
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: scrapeInvoice,
  //   });
  // }

  const processMarketplace = async () => {
    // chrome.runtime.sendMessage({ action: "" })
    // let [tab] = await chrome.tabs.query({ active: true });
    // console.log("processing: "+tab.id);
    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id! },
    //   func: autoAnalyze,
    // }, (results) => {
    //   if (chrome.runtime.lastError) {
    //     console.error("injection failed: ", chrome.runtime.lastError);
    //   } else {
    //     console.log("injection succeeded: ", results);
    //   }
    // });
  }


  const clickHandler = () => {
    // setCount((count) => count + 1);
    // chrome.runtime.sendMessage({ action: 'openNewTab' }, (response) => {
    //   console.log('msg was sent');
    // });
    // processMarketplace();
  }

  const stopPoll = async () => {
    chrome.storage.local.set({"enabled": false});
    chrome.runtime.sendMessage({ action: "endPoll" });
  }

  const startPoll = async () => {
    let res = await chrome.storage.local.get("enabled");
    // console.log(res.enabled); 
    chrome.storage.local.set({"enabled": true});
      chrome.runtime.sendMessage({ action: "startPoll" });
    if (res.enabled) {
      // prevent retrigger 
    } else {
      // chrome.storage.local.set({"enabled": true});
      // chrome.runtime.sendMessage({ action: "startPoll" });
    }
    
  }


  return (
    <div className="App">
      <div> 
        {/* <label>  */}
          {/* <input type="checkbox" checked={enabled} onChange={toggleScript} /> */}
          <button onClick={startPoll}> CONTINUE </button>
          <button onClick={stopPoll}> STOP </button>
        {/* </label> */}
      </div>
    </div>
  )
}

export default App
