import * as React from 'react';
import styles from './tc.module.css';

type DataRowType = {
  manufacturer: string;
  name: string;
  ndc: string;
  price: string;
}

type InvoiceData = DataRowType[];

const Tab = () => {
  const [data, setData] = React.useState<InvoiceData>();

  // React.useEffect(() => {
  //   chrome.storage.local.get("scrapedInvoice", (result) => {
  //     if (result.scrapedInvoice) setData(result.scrapedInvoice);
  //   })
  // })

  React.useEffect(() => {
    // Listen for messages directly (you can use chrome.runtime.onMessage)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "sendDataToNewTab") {
        setData(message.data);
        console.log("displaying data:...");
        console.log(message.data);
      }
    });
  }, []);

  return (
      <div className={styles.page}>
          <h1> Hello World </h1>
          { data && data.map((row) => {
            return (
              <div key={row.ndc}>
                <p> {row.ndc} </p>
              </div>
            )
          })

          }
      </div>
  )
}

export default Tab; 