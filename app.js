const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
// Loop through each select element inside dropdowns
for (let select of dropdowns) {  
    for (let currCode in countryList) {  // countryList is accessible
        let newOption = document.createElement("option");
        newOption.innerText = currCode;  // Display currency code
        newOption.value = currCode;// Set value for selection
        if(select.name === "from" && currCode==="USD"){
            newOption.selected="selected"
        }  
       else if(select.name === "to" && currCode==="INR"){
            newOption.selected="selected"
        }    
        select.appendChild(newOption);   // Append to dropdown
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag =(element)=>{
  let currCode =element.value;
  let countryCode = countryList[currCode];
  let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener ("click", (evt)=>{
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal<1){
        amtVal =1;
        amount.value ="1";
    }

})