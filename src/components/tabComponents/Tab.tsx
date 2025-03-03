import * as React from 'react';
import styles from './tc.module.css';

const Tab = () => {
  const [data, setData] = React.useState();

  // React.useEffect(() => {
  //   chrome.storage.local.get("scrapedInvoice", (result) => {
  //     if (result.scrapedInvoice) setData(result.scrapedInvoice);
  //   })
  // })

  React.useEffect(() => {
    // Listen for messages directly (you can use chrome.runtime.onMessage)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "displayData") {
        setData(message.data);
        console.log("displaying data:...");
        console.log(message.data);
      }
    });
  }, []);

  return (
      <div className={styles.page}>
          <h1> Hello World </h1>
          <div> {data} </div>
      </div>
  )
}

export default Tab; 