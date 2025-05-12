
export function autoAnalyze() {
  document.body.style.backgroundColor = 'lightblue';
  console.log("analyzing");
  let titleText = "Browse items from Marketplace";
  const containers = document.querySelectorAll(`div[data-original-title="${titleText}"]`);
  // if (!containers || isNotIterable(containers)) return;
  for (const ctr of containers) {
    console.log(ctr);
    ctr.click(); 
    const u = ctr?.querySelector('u');
    console.log("u: "+u);
    // if (u) {
    //   console.log(u.textContent?.trim());
    //   u.click();
    // }
  }
}


function isNotIterable(value: any) {
  return value == null || typeof value[Symbol.iterator]!=='function';
}
