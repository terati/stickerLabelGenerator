import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { scrapeInvoice } from './scripts/invoiceScrape'
import { autoAnalyze } from './scripts/autoAnalyze'

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState<any>();

  const [enabled, setEnabled] = useState<boolean>(false); 

  const toggleScript = () => {
    setEnabled(prev => !prev);
    processMarketplace();
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
    let [tab] = await chrome.tabs.query({ active: true });
    console.log("processing: "+tab.id);
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: autoAnalyze,
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("injection failed: ", chrome.runtime.lastError);
      } else {
        console.log("injection succeeded: ", results);
      }
    });
  }


  const clickHandler = () => {
    // setCount((count) => count + 1);
    // chrome.runtime.sendMessage({ action: 'openNewTab' }, (response) => {
    //   console.log('msg was sent');
    // });
    processMarketplace();
  }


  return (
    <div className="App">
      <div> 
        <label> 
          Toggle:
          <input type="checkbox" checked={enabled} onChange={toggleScript} />
        </label>
      </div>
    </div>
  )
}

export default App
