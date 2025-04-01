/*-------   Global Strict Mode   -------*/
"use strict";

/*-------   Form   -------*/
//set global variables
let isValid = false;
let userData = {
    fName : "",
    lName : "",
    number : "",
    email : "",
    comments: ""
};

//function to validate the form
function validateForm(e) {
  //prevents default from submission
  e.preventDefault();

  //access to each input using variables
  const fName = document.getElementById("fName");
  const lName = document.getElementById("lName");
  const phonePref = document.getElementById("phone-pref");
  const number = document.getElementById("number");
  const email = document.getElementById("email");
  const myComments = document.getElementById("myComments");

  //an array of the spans with a msg class
  let inputMsgs = document.querySelectorAll(".msg");

  //set valid to be true
  isValid = true;
  
  //remove all the valid classes
  fName.classList.remove("valid");
  lName.classList.remove("valid");
  number.classList.remove("valid");
  email.classList.remove("valid");
  myComments.classList.remove("valid");

  // hide spans if it has an input
  inputMsgs.forEach(input => {
    input.classList.add("conceal");
  });
  
  //remove error class from all inputs
  fName.classList.remove("error");
  lName.classList.remove("error");
  number.classList.remove("error");
  email.classList.remove("error");
  myComments.classList.remove("remove");
  
  //validate first name input using a regular expression and reveal/conceal error msg accordingly
  let nameRegex = /^[a-z]+$/i;
  if(fName.value === "" || !nameRegex.test(fName.value)) {
    inputMsgs[0].classList.remove("conceal");
    if(fName.value === "") //in case the input is empty
      inputMsgs[0].innerHTML = "Please enter your first name";
    if(fName.value !== "" && !nameRegex.test(fName.value)) //in case the input is not empty but fails the reglar expression test
      inputMsgs[0].innerHTML = "Please use <strong>alphabets only</strong>";
    fName.classList.add("error");
    isValid = false;                           
  } else {
    fName.classList.add("valid");                           
  }
  
  //validate last name input using a regular expression and reveal/conceal error msg accordingly
  if(lName.value === "" || !nameRegex.test(lName.value)) {
    inputMsgs[1].classList.remove("conceal");
    if(lName.value === "") //in case the input is empty
      inputMsgs[1].innerHTML = "Please enter your last name"
    if(lName.value !== "" && !nameRegex.test(lName.value)) //in case the input is not empty but fails the reglar expression test
      inputMsgs[1].innerHTML = "Please use <strong>alphabets only</strong>"
    lName.classList.add("error")
    isValid = false;
  } else {
    lName.classList.add("valid");
  }
  
  //validate phone number input
  //the case when the user selected the phone as their preferred contact method
  if(phonePref.checked) {
    if(number.value === "" || !/^\d{10}$/.test(number.value)) {
        inputMsgs[2].classList.remove("conceal");
        if(number.value === "") //if the input is empty
            inputMsgs[2].innerHTML = "Please enter your phone number";
        if(number.value !== "" && !/^\d{10}$/.test(number.value)) //if the input is not empty but does not follow regular expression
            inputMsgs[2].innerHTML = "Please enter <strong>10 digits </strong>";
        number.classList.add("error");
        isValid = false;
        } else {
            number.classList.add("valid");
        }
    } else {
        //validate email address input
        //the case when the user selected the email as their preferred contact method
        let emailRegex = /^[a-zA-z0-9_.+-~]+@[a-zA-z0-9_.+-~]+\.[a-zA-z0-9_.+-~]{2,5}$/i;
        if(email.value === "" || !emailRegex.test(email.value)) {
            inputMsgs[3].classList.remove("conceal");
            if(email.value === "") //if the input is empty
                inputMsgs[3].innerHTML = "Please enter your email address";
            if(email.value !== "" && !emailRegex.test(email.value)) //if the input is not empty but does not follow regular expression
                inputMsgs[3].innerHTML = 'Please follow the standardized form using only <strong>alphabet, numbers and "_/./+/-/~"</strong>';
            email.classList.add("error")
            isValid = false;
        } else {
            email.classList.add("valid");
        }
    }

    //validate comments input
    if(/^\s*$/.test(myComments.value)) { //comments should be filled with actual words, not only spaces
        inputMsgs[4].classList.remove("conceal");
        inputMsgs[4].innerHTML = "Don't be shy! Let's stay in touch!  gx"
        myComments.classList.add("error")
        isValid = false;
    } else {
        myComments.classList.add("valid");
    }

    //what should be 
    if(isValid === true) {
    //create variable to access the form
    const form = document.getElementById("form");

    //hide the form and let the message indicating the receipt of the form appear
    const formSentMsg = document.getElementById("form-sent-msg");
    if(isValid === true) {
        form.classList.add("hide");
        formSentMsg.classList.remove("hide");
    }

    //remove valid class from each element
    fName.classList.remove("valid");
    lName.classList.remove("valid");
    number.classList.remove("valid");
    email.classList.remove("valid");
    myComments.classList.remove("valid");
    
    //apply user input to the userData object
    userData.fName = fName.value;
    userData.lName = lName.value;
    userData.number = number.value;
    userData.email = email.value;
    userData.comments = myComments.value;

    //display the user input using alert()
    let output = `Your Name:                ${userData.fName} ${userData.lName}\n`;
    if(phonePref.checked) {
        output += `Your Number:            ${userData.number}\n`
    } else if (email.value) {
        output += `Your Email Address:  ${userData.email}\n`
    }
    output += `Your Comments:        ${userData.comments}`
    alert(output);
    console.log(userData)
    
    //reset the value
    fName.value = "";
    lName.value = "";
    number.value = "";
    email.value = "";
    myComments.value = "";
  }
}

//toggle the contact method
document.getElementById("phone-pref").addEventListener("change", toggleContactMethod);
document.getElementById("email-pref").addEventListener("change", toggleContactMethod);

//function to toggle the contact method
function toggleContactMethod () {
    const phonePref = document.getElementById("phone-pref");
    const numberHolder = document.getElementById("number-holder");
    const emailHolder = document.getElementById("email-holder");

    if(phonePref.checked) {
        numberHolder.classList.remove("hide");
        emailHolder.classList.add("hide");
    } else {
        numberHolder.classList.add("hide");
        emailHolder.classList.remove("hide");
    }
};

/* Event Listeners */
//add an event listener to call when the user clicked on submit button
document.getElementById("submit").onclick = (e) => {
    //validate the form
    validateForm(e);
};


/*-------   My Shopping Bag   -------*/
// Essential variables defined globally
const body = document.querySelector("body");
const summary = document.getElementById("summary");
let postCheckout = document.getElementById("post-checkout");
let popupHolder = document.getElementById("popup-holder"); // why the popup wouldnt show if there are no items added
let hideSum = document.getElementById("hide-summary");

//create a universal an array with objects and each object holds info about an item
let items = [
    {
        id: "lamb-sp",
        artwork: "images/LAMB_album.png",
        title: "Love. Angel. Music. Baby<br>-25th Anniversary ver.",
        type: "vinyl",
        price: 37.99,
        quantity: 1
    },
    {
        id: "lamb",
        artwork: "images/LAMB_album.png",
        title: "Love. Angel. Music. Baby.",
        type: "vinyl",
        price: 32.99,
        quantity: 1
    },
    {
        id: "sweetEscape",
        artwork: "images/TheSweetEscape_album.png",
        title: "The Sweet Escape",
        type: "vinyl",
        price: 32.99,
        quantity: 1
    },
    {   
        id: "twtfl",
        artwork: "images/TWTFL_album.png",
        title: "This Is What <br>The Truth Feels Like",
        type: "vinyl",
        price: 32.99,
        quantity: 1
    },
    {
        id: "bouquet",
        artwork: "images/bouquet_album.png",
        title: "Bouquet",
        type: "vinyl",
        price: 32.99,
        quantity: 1
    }
]

//create an empty map object to nest all the items added to the shopping bag
let addItems = new Map();

//create an empty object to nest all the financial information
let finaInfo = {};

//function to match the user input with the items stored in an array
function findItems() {
    for(let i = 0; i < items.length; i++){
        //see if there is a object that has a property called id with a value that is the same name as the element's id
        if(this.id === items[i].id){
           if(!addItems.has(items[i].id)) {
                //set a new item in the addItems map object using the id as the key and the the object in the items array as the value
                addItems.set(items[i].id, items[i]);
            } else if(addItems.get(items[i].id).quantity < 10) {
                //limits the quantity up to 10
                addItems.get(items[i].id).quantity++;
            } else {
                alert("10 items each per person for a one time purchase.");
            }
        } 
    }
}

//function to calculate the fees
function calculateFees() {
    //create variables
    let subTotal = 0;
    let itemNum = 0;
    let shippingFee = 5;
    let tax = 0.056;

    //select each obeject to calculate subtotal and the total number of items for each item
    addItems.forEach(item =>{
        subTotal += item.price * item.quantity;
        itemNum += item.quantity;
    });

    //create a valuable with a equation to give a total fee
    let total = (subTotal * (1 + tax)) + shippingFee;

    //append new properties to the finaInfo object
    finaInfo.subTotal = subTotal;
    finaInfo.itemNum = itemNum;
    finaInfo.taxFee = subTotal * tax;
    finaInfo.shippingFee = shippingFee;
    finaInfo.total = total;
}

//display added items
function displayAddedItems() {
    //create a variable for use in this function
    const itemHolder = document.getElementById("item-holder");
    itemHolder.innerHTML = "";
    let listItem = "";

    //for each item in the addItems, create a new div that displays a block of information
    addItems.forEach(item => {
        listItem += `
        <div class="item mode">
            <img src="${item.artwork}" class="item-img" alt="an artwork of the album that Gwen Stefani ever came out with"/>
            <dl class="mode">
                <dd class="item-type">${item.type}</dd>
                <dt class="item-title">${item.title}</dt>
                <dd class="item-price">$${item.price}</dd>
                <div class="item-quantity">
                    <div class="quantity-label">
                        <p>quantity:</p>
                    </div>
                    <div class="quantity-btn">  
                        <div class="decrement" id="${item.id}"><</div>
                        <dd>${item.quantity}</dd>
                        <div class="increment" id="${item.id}">></div>
                    </div>
                </div>
                <div class="remove" id="${item.id}">Remove This Item</div>
            </dl>
        </div>
        <div class="div-line"></div>`
    });
    //append all the elements to the item-holder element
    itemHolder.innerHTML = listItem;

    //delete the last div-line element in the item-holder
    if(itemHolder.hasChildNodes()) {
        let lastElement = document.querySelector(".div-line:last-child");
        if(lastElement)
            lastElement.remove();
    }

    //add a class to set the dark mode to the dl elements
    let dlItems = document.querySelectorAll("dl");
    //see if it is a dark mode
    if(body.classList.contains("dark")) {       
        dlItems.forEach(dlItem => {
            dlItem.classList.add("dark");
        })
    } else {
        dlItems.forEach(dlItem => {
            dlItem.classList.remove("dark");
        })
    }

    //each time display addItems, functions below should be called as well
    incrementQuantity();
    hideDecrement();
    decrementQuantity();
    enableRemoveBtn();
    displayTotalFee();

}

//function to increment quantity
function incrementQuantity() {
    let increBtns = document.querySelectorAll(".increment");
    increBtns.forEach(increBtn => {
        increBtn.onclick = (e) => {
            let itemId = e.target.id;
            if(addItems.get(itemId).quantity < 10) {
                addItems.get(itemId).quantity++;
                //update the items displayed on the screen
                displayAddedItems();
            } else {
                alert("10 items each per person for a one time purchase.");
            }
        };
    });
}

//function to hide the button to decrement as the quantity is 1
function hideDecrement() {
    let decreBtns = document.querySelectorAll(".decrement");
    decreBtns.forEach(decreBtn => {
        let itemId = decreBtn.id;
        if(addItems.get(itemId).quantity === 1) {
            decreBtn.classList.add("conceal")
        }
    });
}

//function to decrement quantity
function decrementQuantity() {
    let decreBtns = document.querySelectorAll(".decrement");
    decreBtns.forEach(decreBtn => {
        decreBtn.onclick = (e) => {
            let itemId = e.target.id;
            if(addItems.get(itemId).quantity > 1) {
                addItems.get(itemId).quantity--;
                //update the items displayed on the screen
                displayAddedItems();
            }
        };
    });
}

//function to remove selected item from the list
function enableRemoveBtn() {
    document.querySelectorAll(".remove").forEach(removeBtn => {
        //an event listener to call when the user clicked on the remove button
        removeBtn.onclick = (e) => {
            let itemId = e.target.id;
            //resets the quantity to 1
            addItems.forEach(item => {
                if(e.target.id === item.id)
                    item.quantity = 1;
            })
            //delete the item from the object
            addItems.delete(itemId);
            //update the items displayed on the screen
            displayAddedItems();
        }
    });
};

//function to display the total fee of the selected items
function displayTotalFee() {
    const totalHolder = document.getElementById("total-output");
    calculateFees();
    //subtotal, tax fee, shipping fee, total
    totalHolder.innerHTML = `
    <div class="totalCol">
        <p>${finaInfo.itemNum} Item(s) Total Fee</p>
        <p>Tax Fee (5.6%)</p>
        <p>Shipping Fee</p>
        <div class="total-line"></div>
        <span class="total-fee">Total Fee</span>
    </div>`

    //what would be on the screen if there were no items added to the bag
    if(addItems.size === 0) {
        totalHolder.innerHTML += `
        <div class="totalCol" id="totalSecCol">
            <p>$0</p>
            <p>$0</p>
            <p>$0</p>
            <div class="total-line"></div>
            <span class="total-fee">$0</span>
        </div>
        `;
    }else {
        //retrieve the data of subtotal, tax fee, shipping fee, and total from the finaInfo
        totalHolder.innerHTML += `
        <div class="totalCol" id="totalSecCol">
            <p>$${finaInfo.subTotal.toFixed(2)}</p>
            <p>$${finaInfo.taxFee.toFixed(2)}</p>
            <p>$${finaInfo.shippingFee}.00</p>
            <div class="total-line"></div>
            <span class="total-fee">$${finaInfo.total.toFixed(2)}</span>
        </div>`;
    }

    //add a class to set the dark mode to the div elements with a total-line class
    if(body.classList.contains("dark")) {
        let totalLines = document.querySelectorAll("div.total-line");
        totalLines.forEach(line => {
            line.classList.add("dark");
        });
    }
}

//function to hide the my shopping bag and appear with the myBag button on the nav
function returnToDefault() {
    const myBag = document.getElementById("myBag");
    if(!summary.classList.contains("hide")) {
      summary.classList.add("hide");
      hideSum.classList.add("hide");
      myBag.classList.remove("hide");
    }
};

//function to clear up what was applied to the addItems in the previous session
function resetItems() {
    addItems.clear();
    displayAddedItems();
    displayTotalFee();
}


/* Event Listeners */
//events that calls when the add-to-cart buttons are clicked
let btns = document.querySelectorAll(".add-to-cart");
btns.forEach(btn => {
    btn.addEventListener("click", findItems);
});

//event that calls everytime the #myBag is clicked
document.getElementById("myBag").onclick = () => {
    const summary = document.getElementById("summary");
    const myBag = document.getElementById("myBag");
    hideSum.classList.remove("hide");
    
    //show the summary element and hide the button
    if(summary.classList.contains("hide")) {
        summary.classList.remove("hide");
        myBag.classList.add("hide");
    }

    //display added items and the calculated total fees
    displayAddedItems();
    displayTotalFee();

};

//event that calls when outside of the summary is clicked
hideSum.addEventListener("click", returnToDefault);
//event that calls when go back button iin #my-shopping-bag is clicked
document.querySelector("#my-shopping-bag .go-back").addEventListener("click", returnToDefault);

//call the event for checkout button 
document.getElementById("checkout-btn").onclick = () => {
    //display an aleart in case the user hasn't added anything yet to the list
    if(addItems.size === 0){
        return alert("Please add Items");
    } else {
        //disable scrolling
        body.classList.add("static");
        //show the popup window with the purchase summary
        postCheckout.classList.remove("hide");
        popupHolder.innerHTML = `
        <h2>Thank You For Shopping With Us!<span class="go-back"></span></h2>
        <div class="go-back">
            <span class="go-back-btn"></span>
        </div>
        <div id="popup-item"></div>
        <div id="popup-fee"></div>`;

        //hide the summary tab
        returnToDefault();

        //insert items to the popup window if there are items inside
        let count = 0;
        let div = null;
        let popupItem = document.getElementById("popup-item");
        popupItem.innerHTML = "";
        addItems.forEach(item => {
            //group up each two elements and give them an id of the number according to the order of their appearance counting from 1
            let divId = Math.ceil(count / 2);
            if(count % 2 == 0) {
                div = document.createElement('div');
                div.id = divId.toString()// devide each items with math celing 
            }
            
            //add a block of information for each item purchased by the user
            div.innerHTML += `
            <div class="item">
                <img src="${item.artwork}" class="item-img" alt="an artwork of the album that Gwen Stefani ever came out with"/>
                <dl class="mode">
                    <dd class="item-type">${item.type}</dd>
                    <dt class="item-title">${item.title}</dt>
                    <dd class="item-price">$${item.price}</dd>
                    <dd class="item-quantity"><span>Quantity: &nbsp;</span>${item.quantity}</dd>
                </dl>
            </div>
            <div class="div-line"></div>`

            //append the node to the #popup-id element
            popupItem.appendChild(div);

            //if the element is the last child, the last line element should be removed
            if(count % 2 === 1 || count === addItems.size - 1) {
                let lastNode = document.querySelector(".div-line:last-child");
                console.log(lastNode);
                if(lastNode)
                    lastNode.remove();
            }
            count++;
        });
        
        document.getElementById("popup-fee").innerHTML = `
        <div>
            <h3>${finaInfo.itemNum} Item(s) Total</h3>
        </div>
        <div>
            <h3>$${finaInfo.total.toFixed(2)}</h3>
        </div>`;

        //clear the content inside the addItems object
        resetItems();
    }

    //hide the popup window
    if(!postCheckout.classList.contains("hide")) {
        document.getElementById("hide-popup-holder").addEventListener("click", function() {
            postCheckout.classList.add("hide");
            body.classList.remove("static")
        });
        document.querySelector("#post-checkout div.go-back").addEventListener("click", function() {
            postCheckout.classList.add("hide");
            body.classList.remove("static")
        });
    }
};



/*-------   Dark Mode   -------*/
//global variable
const modeToggler = document.getElementById("light-mode-switch");
//event that calls when the light-mode switch is clicked
modeToggler.onclick = () => {
    const modeElements = document.querySelectorAll(".mode");
    //when the checkbox associated with the modeElements is checked
    if(modeToggler.checked) {
        modeElements.forEach(element => {
            //all the elements that has a class named mode will be added with a class named dark and modified style accordingly
            element.classList.add("dark");
        });
    } else {
        //remove the class "dark" to toggle back to the light mode
        modeElements.forEach(element => {
            element.classList.remove("dark");
        });
    }
}