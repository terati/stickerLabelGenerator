import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { scrapeInvoice } from './scripts/invoiceScrape'

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState<any>();

  const scrapePage = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: scrapeInvoice,
    });
  }

  

  const clickHandler = () => {
    // setCount((count) => count + 1);
    chrome.runtime.sendMessage({ action: 'openNewTab' }, (response) => {
      console.log('msg was sent');
    });
    scrapePage();
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} 
          className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={clickHandler}>
            count is: {count}
            {msg};
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
