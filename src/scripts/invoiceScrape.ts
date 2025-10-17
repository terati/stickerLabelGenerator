
interface RowInterface {
    name?: string;
    ndc?: string; manufacturer?: string;
    price?: string;
    qty?: string; 
}

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

type NullableRowInterface = Nullable<RowInterface>;




export const scrapeInvoice = () => {
  document.body.style.backgroundColor = 'black';
  // console.log("attempting scrape");
  const cleanString = (s: any) => {
    if (typeof(s)!='string') return ""; 
    if (s==null) return "";
    let tmp = s.split(/\s+/)
      .map(word => word.trim())
      .join(' ');
    tmp = tmp.trim();
    return tmp;
  }

  const rowElements = document.querySelectorAll('[data-hook="order_details_line_item_row"]');
  const rows:NullableRowInterface[] = [];
  if (rowElements) {
      
      for (let rowElement of rowElements) {
        console.log(rowElement)
        let row:NullableRowInterface = { name: '', ndc: '', manufacturer: '', price: '', qty: ''};
        let tmp = rowElement.children[1];
        let nameTmp = '';
        for (let i=0; i<tmp.childNodes.length; ++i) {
            if (tmp.childNodes[i].nodeType===Node.TEXT_NODE) nameTmp += tmp.childNodes[i].textContent;
        }
        // row.name = cleanString(nameTmp.trim().replace(/\Mint\)/g, ''));
        // console.log(rowElement.querySelector('[data-title]')?.getAttribute('data-title')); 
        row.name = rowElement.querySelector('[data-title]')?.getAttribute('data-title')
        row.ndc = cleanString(rowElement.children[2].textContent);
        row.manufacturer = cleanString(rowElement.children[3].textContent);
        let price = rowElement.querySelector(".price");
        // console.log("price: "+price?.textContent);

<<<<<<< HEAD
          // row.price = cleanString(rowElement.children[5].textContent);
          // row.price = cleanString(price?.textContent);s
          console.log(row.price);
          rows.push(row);
=======
        // row.price = cleanString(rowElement.children[5].textContent);
        row.price = cleanString(price?.textContent).substring(1);
        // console.log(row.price);
        let qty = cleanString(rowElement.querySelector('[data-hook="order_item_qty"]')?.textContent);
        row.qty = ''+Math.min(8, parseInt(qty));
        console.log(row.qty)
        rows.push(row);
>>>>>>> 9dfb4df (somewhat working single page for cardinal)
      }
      console.log(rows);
      setTimeout(() => {
        chrome.runtime.sendMessage({ action: "sendDataToNewTab", data: rows });
      }, 1000);
      
  }
}