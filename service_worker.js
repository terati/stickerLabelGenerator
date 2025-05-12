chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("hit: "+message.action);  
  if (message.action==="START") {
    // active: true, currentWindow: true
    chrome.tabs.query({active: true}, (tabs) => {
      const activeTab = tabs[0];
      console.log(tabs);
      if (!activeTab || !activeTab?.id) return; 
      console.log(activeTab);
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['dist/autoAnalyze.js']
      }, () => {
      });
    })

    // chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    //   const activeTab = tabs[0];
    //   if (!activeTab || !activeTab?.id) return; 
    //   console.log(activeTab);
    //   chrome.scripting.executeScript({
    //     target: { tabId: activeTab.id },
    //     files: ['dist/invoiceScrape.js']
    //   }, () => {
          
    //     chrome.tabs.sendMessage(activeTab.id, { action: 'scrapeData' }, (response) => {
    //       console.log(response);
    //       chrome.tabs.sendMessage(newTab.id, { action: 'displayData', data: response });
    //     });
    //   });
    // });
    
  } else if (message.action==="STOP") {
    
  }
})