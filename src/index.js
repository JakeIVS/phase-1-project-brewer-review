document.addEventListener("DOMContentLoaded", initialize())
const breweryList = document.querySelector('#brewery-list');
function initialize() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            listElement(brewery)
        })
        populateDetails(data[0]);
    })
}
function listElement(brewery){
    let li = document.createElement('li');
    li.textContent=`${brewery.name}, ${brewery.city}`;
    document.querySelector("#brewery-list").appendChild(li);
    li.addEventListener('click',()=>populateDetails(brewery));
    li.addEventListener('mouseenter', ()=>li.style.color = 'orange')
    li.addEventListener('mouseleave', ()=>li.style.color = 'white')
};
// Show the details of the selected brewery in the center of the page
function populateDetails(brewery) {
    let name = document.querySelector('#details-name');
    let address = document.querySelector('#details-address')
    let state = document.querySelector('#details-state')
    let type = document.querySelector('#details-type')
    let url = document.querySelector('#details-url')
    let phone = document.querySelector('#phone-number')
    let breweryInfo = {
        name: brewery.name,
        address: brewery.street,
        state: brewery.state,
        url: brewery.website_url,
        phone: brewery.phone,
        type: brewery.brewery_type 
    }
    name.textContent = breweryInfo.name;
    address.textContent = breweryInfo.address;
    state.textContent = breweryInfo.state;
    type.textContent = breweryInfo.type;
    url.href = breweryInfo.url;
    phone.textContent = `(${breweryInfo.phone.slice(0, 3)}) ${breweryInfo.phone.slice(3, 6)}-${breweryInfo.phone.slice(6)} `;
}