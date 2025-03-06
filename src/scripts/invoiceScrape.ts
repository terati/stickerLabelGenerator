
interface RowInterface {
    name?: string;
    ndc?: string; manufacturer?: string;
    price?: string;
}

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

type NullableRowInterface = Nullable<RowInterface>;




export const scrapeInvoice = () => {
  // document.body.style.backgroundColor = 'orange';
  // console.log("attempting scrape");
  const cleanString = (s: string | null) => {
    if (s==null) return "";
    return s.split(/\s+/)
      .map(word => word.trim())
      .join(' ');
  }

  const rowElements = document.querySelectorAll('[data-hook="order_details_line_item_row"]');
  const rows:NullableRowInterface[] = [];
  if (rowElements) {
      for (let rowElement of rowElements) {
          let row:NullableRowInterface = { name: '', ndc: '', manufacturer: '', price: ''};
          let tmp = rowElement.children[1];
          let nameTmp = '';
          for (let i=0; i<tmp.childNodes.length; ++i) {
              if (tmp.childNodes[i].nodeType===Node.TEXT_NODE) nameTmp += tmp.childNodes[i].textContent;
          }
          row.name = cleanString(nameTmp.trim().replace(/\Mint\)/g, ''));
          row.ndc = cleanString(rowElement.children[2].textContent);
          row.manufacturer = cleanString(rowElement.children[3].textContent);
          row.price = cleanString(rowElement.children[5].textContent);
          rows.push(row);
      }
      console.log(rows);
      setTimeout(() => {
        chrome.runtime.sendMessage({ action: "sendDataToNewTab", data: rows });
      }, 1000);
      
  }
}