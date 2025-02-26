
interface RowInterface {
    name?: string;
    ndc?: string; manufacturer?: string;
    price?: string;
}

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

type NullableRowInterface = Nullable<RowInterface>;

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
        row.name = nameTmp.trim().replace(/\Mint\)/g, '');
        row.ndc = rowElement.children[2].textContent;
        row.manufacturer = rowElement.children[3].textContent;
        row.price = rowElement.children[5].textContent;
        rows.push(row);
    }
    chrome.runtime.sendMessage({ action: "openTableInNewTab", rows: rows });
}