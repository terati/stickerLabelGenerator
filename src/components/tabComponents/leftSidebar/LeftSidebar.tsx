import * as React from 'react'; 
import styles from './lsb.module.css';
import { Button } from 'antd';


type DataRowType = {
  manufacturer: string;
  name: string;
  ndc: string;
  price: string;
}

type InvoiceData = DataRowType[];

<<<<<<< HEAD
const LeftSidebar = () => {
  return <></>
=======
const LeftSidebar = (props) => {
  const {
    storedData,
    setStoredData,
    data, 
    setData
  } = props;
  
  

  React.useEffect(() => {
    chrome.storage.local.set({'exampleKey': 'examplevalue', function() {

    }})
    // chrome.storage.local.get("scrapedInvoice", (result) => {
    //   if (result.scrapedInvoice) setData(result.scrapedInvoice);
    // })
  }, [])

  const refreshStoredData = () => {
    chrome.storage.local.get(['storedData'], function(result) {
      console.log(result.storedData);
      setStoredData(result.storedData); 
    });
    
  }

  const addToStoredData = async () => {
    refreshStoredData();
    let tmp_data: InvoiceData = []; 
    chrome.storage.local.get(['storedData'], function (result) {
      tmp_data = result;
    });
    if (tmp_data==undefined) tmp_data = [];
    setStoredData(tmp_data); 
    let updatedValue = [ ...tmp_data, ...data];
    console.log(updatedValue);
    chrome.storage.local.set({'storedData': updatedValue}); 
  }

  

  return (
    <div className={styles.leftSidebar}>
      <Button onClick={addToStoredData} type="primary"> Add to Stored Data </Button>
      { data && data.map((row) => {
        return (
          <div key={row.ndc}>
            <p> {row.ndc} </p>
          </div>
        )
      })
      }
      <div className={styles.storedData}>
        <Button onClick={refreshStoredData} type="primary"> Refresh Data </Button>
        {
          storedData && storedData.map((row) => {
            return (
              <div key={row.ndc}>
                <p> {row.ndc} </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
>>>>>>> 9dfb4df (somewhat working single page for cardinal)
}

export default LeftSidebar;