chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("hit");  
  // message.action==="openNewTab"
  // url: chrome.runtime.getURL()
  if (message.action==="openNewTab") {
        console.log(message);
        chrome.tabs.create({
            // url: 'http://localhost:4000/test2'
            url: "newtab.html"
        }, (tab) => {
            setTimeout(() => {
                chrome.tabs.sendMessage(tab.id, { type: 'tableData', rows: message.rows }, (res) => {
                    if (chrome.runtime.lastError) {
                        chrome.error('Failed to send message: ', chrome.runtime.lastError);
                    } else {
                        console.log('Message sent successfully');
                    }
                } )
            }, 1000);
        })
    }
})