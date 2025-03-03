chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("hit");  
  // message.action==="openNewTab"
  // url: chrome.runtime.getURL()
  if (message.action==="openNewTab") {
    chrome.tabs.create({
        // url: 'http://localhost:4000/test2'
        url: "newtab.html"
    }, (tab) => {
        // setTimeout(() => {
        //     // chrome.tabs.sendMessage(tab.id, { type: 'tableData', rows: message.rows }, (res) => {
        //     //     if (chrome.runtime.lastError) {
        //     //         chrome.error('Failed to send message: ', chrome.runtime.lastError);
        //     //     } else {
        //     //         console.log('Message sent successfully');
        //     //     }
        //     // } )
        // }, 1000);
        // currentWindow: true
        chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
          const activeTab = tabs[0];
          if (!activeTab || !activeTab?.id) return; 
          console.log(activeTab);
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ['dist/invoiceScrape.js']
          }, () => {
              
            chrome.tabs.sendMessage(activeTab.id, { action: 'scrapeData' }, (response) => {
              console.log(response);
              chrome.tabs.sendMessage(newTab.id, { action: 'displayData', data: response });
            });
          });
        });
    })
    
  } else if (message.action==="scrapeInvoice") {
    
  }
})