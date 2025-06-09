

// let clickLoopInterval;




export function autoAnalyze() {
  // let shouldRun: boolean = false;
  // if (shouldRun) {
  //   shouldRun = false;
  // } else {
  //   shouldRun = true;
  // }
  // startClickLoop();

  function scrapeTable() {
    const tbody = document.querySelector('tbody');
    if (tbody) {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach((row, index) => {
        // if (index>=2) return;
        console.log(row);
        const ndcNumber = row.getAttribute('ndc-number');
        const className = row.className.trim();
        if (className!='') {
          //this is a wholesaler
          console.log("skipping");
        } else {
          const lastTd = row.querySelector('td:last-child');
          const addToCartButton = lastTd?.querySelector('button');
          console.log(ndcNumber + "_" + className);
          console.log("clicking");
          if (addToCartButton && 
            (ndcNumber=="00003089321" || ndcNumber=="00003089421" || // eliquis
              ndcNumber=="50458057930" || ndcNumber=="50458057830" || // xarelto 15 and 20
              ndcNumber=="00597014030" || ndcNumber=="00597014090" || // tradjenta
              ndcNumber=="00597015330" || ndcNumber=="00597015390" || //jardiance 25
              ndcNumber=="00597015230" || ndcNumber=="00597015290" // jardiance 10
              // || ndcNumber=="73521003002" // test for tryvaya
            )
            ) {
            addToCartButton.click();
          }
        }
        
        
        
      })
    }
  }


  function refreshPage() {
    document.body.style.backgroundColor = 'black';
    console.log("analyzing");
    let titleText = "Browse items from Marketplace";
    const containers = document.querySelectorAll(`div[data-original-title="${titleText}"]`);
    for (const ctr of containers) {
      // console.log(ctr);
      ctr.click(); 
      const u = ctr?.querySelector('u');
    }
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

function isNotIterable(value: any) {
  return value == null || typeof value[Symbol.iterator]!=='function';
}



function stopClickLoop() {
  // clearTimeout(clickLoopInterval);
}


