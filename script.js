//SELECTORS
const salesCal = document.querySelector(".button");
const number = document.querySelector(".number");
const imported = document.querySelector('.imported');
const itemDesc = document.querySelector('.itemdesc');
const filterType = document.querySelector('.filterType');
const price = document.querySelector('.price')
const totalprice = document.querySelector('.totalprice');
const salesprice = document.querySelector('.salesprice');
const purchaseTableEl = document.querySelector('.purchaseTable');

//EVENT LISTENERS
salesCal.addEventListener("click", addExpenseToTotal);

//FUNCTIONS
let salesPrice = 0;
let totalPrice = 0;

//allExpenses at one place in an array having objects as key value pair of desc and price.
let allPurchases = [];

function addExpenseToTotal(event) {

    //create an empty object        
    const purchaseItem = {};

    //prevent form from submitting
    event.preventDefault();
    
    //read value from input
    const textNumber = number.value;
    const textImp = imported.value;
    const textDesc = itemDesc.value;
    const textPrice = price.value;
    const textType = filterType.value;
    
    //Check it imported field is correctly filled or not
    if (textImp !== "" && textImp !== 'imported') {
        alert('The imported field can only get imported as input or leave it blank if the item is not imported');
        //clear input value
        number.value = "";
        imported.value = "";
        itemDesc.value = "";
        price.value = "";
        //focus or move cursor to desc input tag
        function toFocus() {
        document.getElementById("focus").focus();
        }
        toFocus();
        return;
    }

    //check if the textDesc, textNumber or TextPrice field is written or not (required attribute is not working)
    if (textDesc === "" || textNumber === "" || textPrice === "") {
        alert('The form is empty. Please fill the whole form. You can only leave the imported field as empty. All other fields must be filled.');
        //clear input value
        number.value = "";
        imported.value = "";
        itemDesc.value = "";
        price.value = "";
        //focus or move cursor to desc input tag
        function toFocus() {
        document.getElementById("focus").focus();
        }
        toFocus();
        return;
    }

    // convert number and price to variable
    const itemNumber = parseInt(textNumber);
    let itemPrice = parseFloat(textPrice);
    itemPrice = Number(Math.round(parseFloat(itemPrice + 'e2')) + 'e-2');

    //Store this itemPrice in another variable 
    let prevItemPrice = itemPrice;
    
    //Calculate change in itemPrice after Tax
    switch (textType) {
        
        case "Book":
            if (textImp === 'imported') {
                itemPrice = itemPrice + (0.05 * itemPrice);
            }
        break;
            
        case "Food":
            if (textImp === 'imported') {
                itemPrice = itemPrice + (0.05 * itemPrice);
            }
        break;
                
        case "Medics":
            if (textImp === 'imported') {
                itemPrice = itemPrice + (0.05 * itemPrice);
            }
            break;
        
        case "None":
            if (textImp === 'imported') {
                itemPrice = itemPrice + (0.15 * itemPrice);
            }
            else
                { itemPrice = itemPrice + (0.1 * itemPrice); }
        break;
    }

    //Calculate Total Price
    totalPrice = totalPrice + (itemNumber * itemPrice);
    totalPrice = Number(Math.round(parseFloat(totalPrice + 'e2')) + 'e-2').toFixed(2);
    const someText = `${totalPrice}`;
    totalprice.innerText = someText;

    //Calculate SalesTax
    salesPrice = salesPrice + (itemPrice - prevItemPrice);
    salesPrice = Number(Math.round(parseFloat(salesPrice + 'e2')) + 'e-2').toFixed(2);
    const otherText = `${salesPrice}`;
    salesprice.innerText = otherText;
    
    itemPrice = Number(Math.round(parseFloat(itemPrice + 'e2')) + 'e-2').toFixed(2);

    //put number,imported,desc and price in object
    purchaseItem.number = textNumber;
    purchaseItem.imp = textImp;
    purchaseItem.desc = textDesc;
    purchaseItem.price = itemPrice;
    allPurchases.push(purchaseItem);


    //Show All Purchases on screen
    renderList(allPurchases);

    //clear input value
    number.value = "";
    imported.value = "";
    itemDesc.value = "";
    price.value = "";

    //focus or move cursor to desc input tag
    function toFocus() {
        document.getElementById("focus").focus();
    }
    toFocus();
}

function renderList(arrOfList) {
        const allExpenseHTML = arrOfList.map((expense) =>
          createListItem(expense)
        );

        const joinedAllExpenseHTML = allExpenseHTML.join("");
        // console.log(joinedAllExpenseHTML);
        purchaseTableEl.innerHTML = joinedAllExpenseHTML;
        allExpenses = arrOfList;
}
      
function createListItem({ number, imp, desc, price }) {
    return`<div class="listItem flex m-4 mb-0 w-4/5 h-20 bg-white rounded">
            <div class="left itemNumber w-1/5 text-2xl text-center leading-20">${number}</div>
            <div class="middleImp itemImp w-1/5 text-2xl text-center leading-20">${imp}</div>
            <div class="middleDesc itemDesc w-2/5 text-2xl text-center leading-20 truncate">${desc}</div>
            <div class="w-1/5 text-2xl text-center leading-20">:</div> 
            <div class="right itemPrice w-1/5 text-2xl text-center leading-20">$ ${price}</div>
        </div>`;
      }
