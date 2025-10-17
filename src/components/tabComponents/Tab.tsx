import * as React from 'react';
import styles from './tc.module.css';
import { DocumentCanvas } from './documentCanvas';
import { LeftSidebar } from './leftSidebar';
import { Button, Input, Switch } from 'antd';

type DataRowType = {
  manufacturer: string;
  name: string;
  ndc: string;
  price: string;
}

type InvoiceData = DataRowType[];

const Tab = () => {
<<<<<<< HEAD
  return <>
  </>
=======
  // const [data, setData] = React.useState<InvoiceData>();
  const [nrows, setNrows] = React.useState<number>();
  const [ncols, setNcols] = React.useState<number>();
  const [adjustGrid, setAdjustGrid] = React.useState<boolean>(true);
  const [hideGrid, setHideGrid] = React.useState<boolean>(true);

  const [storedData, setStoredData] = React.useState<InvoiceData>([]);
  const [data, setData] = React.useState<InvoiceData>([]);

  const [description, setDescription] = React.useState("Real Value Rx");


  React.useEffect(() => {
    // Listen for messages directly (you can use chrome.runtime.onMessage)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "sendDataToNewTab") {
        chrome.storage.local.set({'scrapedData': message.data});
        setData(message.data);
      }
    });
  }, []);

  return (
    <div className={styles.page}>
      <h1> good afternon </h1>
      <div className={styles.topbar}> 
        {/* <Input placeholder='nrows' /> */}
        <Input placeholder="Descriptor" value={description} onChange={(e) => setDescription(e.target.value)}  />
        <Input placeholder="ncols" />
        <Button type="primary"> export </Button>
        <Switch checked={adjustGrid} onClick={() => setAdjustGrid(prev => !prev)}/>
      </div>
      {/* { data && data.map((row) => {
        return (
          <div key={row.ndc}>
            <p> {row.ndc} </p>
          </div>
        )
      })
      } */}
      <div className={styles.content}> 
        <LeftSidebar storedData={storedData} setStoredData={setStoredData} data={data} setData={setData} />
        <div className={styles.right}>
          <DocumentCanvas 
            // nrows={nrows} ncols={ncols} 
            description={description}
            adjustGrid={adjustGrid}
            storedData={storedData} setStoredData={setStoredData} data={data} setData={setData}
          />
        </div>
        
      </div>
      
    </div>
  )
>>>>>>> 9dfb4df (somewhat working single page for cardinal)
}

export default Tab; 