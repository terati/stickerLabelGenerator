

// let clickLoopInterval;

export function autoAnalyze() {
  
  // class ARX_Interface {
    // divId: string;
    // thtml: string;
    // cdiv: HTMLDivElement;
    // tdiv: HTMLElement | null;
    
    // constructor() {
      let divId = "arx_interface";
      let tdiv = document.getElementById(divId);
      let thtml = `
      <p> ppb_agent v.00.100.2 </p>
      <p class="b_activity"> modeL: passive; active:[10:22::00 -> 12:18::00]] </p>
      <p id="last"> last scraped: <span id="scanned"> </span></p>

    `
          // <p id="random_number">_</p>
      let cdiv = document.createElement('div'); 
      
      if (!tdiv) {
        cdiv = document.createElement('div');
        cdiv.id = divId;
        cdiv.style.position = 'fixed';
        cdiv.style.bottom = '0';
        cdiv.style.left = '0';
        cdiv.style.right = '0';
        // div.style.width = '100vw';
        cdiv.style.height = '100px';
        cdiv.style.backgroundColor = 'black';
        cdiv.style.backdropFilter = 'blur(100px)';
        cdiv.style.opacity = '0.8';
        cdiv.style.color = 'white';
        cdiv.style.padding = '10px'; 
        cdiv.style.zIndex = '9999';
        cdiv.style.margin = '1rem 4rem';
        cdiv.style.borderRadius = '10px';
        cdiv.textContent = 'Test Content';
        // document.body.appendChild(cdiv);
      } else {
        tdiv.innerHTML = thtml;
        let randomNum = Math.floor(Math.random()*10);
        let ptag = document.getElementById("random_number");
        if (ptag) ptag.innerText = randomNum.toString();
      }
    // }

    

    const refreshInterface = async () => {
      let tdiv = document.getElementById(divId);
      if (tdiv) {
        tdiv.innerHTML = thtml;
        let randomNum = Math.floor(Math.random()*10);
        let ptag = document.getElementById("random_number");
        if (ptag) ptag.innerText = randomNum.toString();
        let scraped = document.getElementById("scanned");
        let lastread = await chrome.storage.local.get("datum");
        if (scraped) scraped.innerText = lastread.datum.toString(); 
      }
    }
  // }


  function scrapeTable() {

    // refreshInterface();

    const tbody = document.querySelector('tbody');
    if (tbody) {
      const rows = tbody.querySelectorAll('tr');
      
      // console.log(rows);
      let items: string[] = [];
      rows.forEach((row, index) => {
        // if (index>=2) return;
        console.log(row);
        const ndcNumber = row.getAttribute('ndc-number');
        const className = row.className.trim();
        if (className!='') {
          //this is a wholesaler
          console.log("skipping");
        } else {
          items.push(ndcNumber + " " + className);
          const lastTd = row.querySelector('td:last-child');
          const addToCartButton = lastTd?.querySelector('button');
          // console.log(ndcNumber + "_" + className);
          // console.log("clicking");
          if (addToCartButton && 
            (ndcNumber=="00003089321" || ndcNumber=="00003089421" || // eliquis
              ndcNumber=="50458057930" || ndcNumber=="50458057830" || // xarelto 15 and 20
              ndcNumber=="00597014030" || ndcNumber=="00597014090" || // tradjenta
              ndcNumber=="00597015330" || ndcNumber=="00597015390" || //jardiance 25
              ndcNumber=="00597015230" || ndcNumber=="00597015290" || // jardiance 10
              // ndcNumber=="00169431430" || // rybelsus 14
              // ndcNumber=="00169430730" || // rybelsus 7
              
              // ndcNumber=="00456120330" || // linzess 72
              // ndcNumber=="00456120130" || // linzess 145
              // ndcNumber=="00456120230" || // linzess 290

              ndcNumber=="00469260130" || ndcNumber=="00469260190" || // myrbetriq 25
              ndcNumber=="00023320503" || // lumigan
              // ndcNumber=="00173085910" || // breo 100
              // ndcNumber=="00173088210" || //breo 200
              // ndcNumber=="00006027754" || ndcNumber=="00006027731" ||  // januvia 100
              // ndcNumber=="00023916360" || // restasis
              // ndcNumber=="00456120230"
              // ndcNumber=="00310620530" || ndcNumber=="00310620590"  // farxiga 5
              
              ndcNumber=="00078069661" || ndcNumber=="00078069620" // entresto 96/103
            )
            ) {
            addToCartButton.click();
          }
        }
        
        
        
      })
      chrome.storage.local.set({"datum": items});
    }
  }


  async function refreshPage() {
    // document.body.style.backgroundColor = 'green';
    console.log("analyzing");
    let res = await chrome.storage.local.get("enabled");
    // console.log(enabled); 
    let titleText = "Browse items from Marketplace";
    const containers = document.querySelectorAll(`div[data-original-title="${titleText}"]`);
    for (const ctr of containers) {
      // console.log(ctr);
      (ctr as HTMLElement).click(); 
      const u = ctr?.querySelector('u');
    }

    // refreshInterface();
  }
  refreshPage();
  scrapeTable();
  

  // function startClickLoop() {
  //   function randomClick() {
  //     analyzePage();
  //   }
  //   function loop(): void {
  //     if (!shouldRun) {
  //       console.log("Click loop stopped.");
  //       return;
  //     }
  //     console.log("Running");
  //     randomClick();
  //     const delay = Math.random() * (10_000-3000) + 1000;
  //     setTimeout(loop, delay);
  //   }
  //   loop();
  // }

}


