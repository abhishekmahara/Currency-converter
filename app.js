const Base_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg =document.querySelector(".msg");



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


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // Fetch exchange rates relative to EUR
    const URL = `${Base_URL}`;
    console.log("Fetching from:", URL);
    
    let response = await fetch(URL);
    console.log("Response Status:", response.status);

    if (response.ok) {
        let data = await response.json();
        console.log("Fetched Data:", data);
        
        // Access the rates inside the 'eur' object
        let rates = data.eur;
        console.log("Available Rates:", Object.keys(rates).filter(code => code.length === 3));
        
        // Try using lowercase to match possible lowercase keys
        let fromCode = fromCurr.value.toLowerCase();
        let toCode = toCurr.value.toLowerCase();
        
        console.log("Searching for Rates:", fromCode, toCode);

        let fromRate = rates[fromCode];
        let toRate = rates[toCode];

        // Validate if both rates exist
        if (fromRate && toRate) {
            let rate = toRate / fromRate;
            let finalAmount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        } else {
            console.log("Rates Not Found:", fromCode, toCode);
            msg.innerText = "Currency not supported.";
        }
    } else {
        msg.innerText = "Failed to fetch exchange rates. Try again later.";
    }
});
