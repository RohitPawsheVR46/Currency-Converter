const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";//usd.json";

let selects = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#btn");
let fromCurr = document.querySelector("#from");
let toCurr = document.querySelector("#to");
let inp = document.querySelector("#enteramt");
let msg = document.querySelector("#msg");

for (let select of selects) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.textContent = currCode;
        newOption.value = currCode;
        if (select.name === "From" && currCode === "INR") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && currCode === "USD") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);

    }
    select.addEventListener("change", function (evt) {
        updateFlag(evt.target);
    })
}
function updateFlag(element) {
    // console.log(element);
    // console.log(element.value);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://countryflagsapi.netlify.app/flag/${countryCode}.svg`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
async function updateCurrency() {
    let fromVal = fromCurr.value;
    let toVal = toCurr.value;
    console.log(fromVal, toVal);
    if (inp === "" || inp.value < 1) {
        inp.value = 1;
    }

    let url = `${BASE_URL}${fromVal.toLowerCase()}.json`;
    let response = await fetch(url);
    // console.log(response);
    let rate = await response.json();
    //    console.log(rate);
    // console.log(rate[fromVal.toLowerCase()][toVal.toLowerCase()]);
    let ans = rate[fromVal.toLowerCase()][toVal.toLowerCase()];
    msg.textContent = `${inp.value} ${fromVal} = ${ans} ${toVal}`;
}
btn.addEventListener("click", function (e) {
    e.preventDefault();
    updateCurrency();
})
window.addEventListener("load", function () {
    updateCurrency();
})
