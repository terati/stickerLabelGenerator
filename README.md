##
# Start the react test environment that shows the extension small window by running: 
  - npm run dev 

// "chrome_url_overrides": {
    //   "newtab": "newtab.html"
    // },



  // "http://*/*", "https://*/*", 

  "content_scripts": [
      {
        "js": ["src/scripts/invoiceScrape.ts"],
        "matches": []
      }
    ],


,
    "chrome_url_overrides": {
      "newtab": "newtab.html"
    }