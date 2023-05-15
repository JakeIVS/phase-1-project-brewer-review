document.addEventListener("DOMContentLoaded", initialize())
const breweryList = document.querySelector('#brewery-list');
let breweryInfo = {};
function initialize() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            listElement(brewery)
        })
        populateDetails(data[0]);
        debugger
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
    breweryInfo = {
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
// add a favorite button that switches the list to your favorited breweries
let favBtn = document.querySelector('#favorites-btn')
favBtn.addEventListener('mouseenter', ()=> {
    favBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
});
favBtn.addEventListener('mouseleave', ()=> {
    favBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
});
favBtn.addEventListener('click', ()=>{
    if (favBtn.textContent === '☆') {
        favBtn.textContent = '★'
        fetch('http://localhost:3000/breweries')
        .then(r=>r.json())
        .then(data=>{
            breweryList.innerHTML = ''
            data.forEach(brewery=>{
                listElement(brewery);
            })
            listElement(data[0]);
        })
    } else {
        favBtn.textContent = '☆'
        breweryList.innerHTML = ''
        initialize()
    }
})
// add a favorite button to the details page that adds the current brewery to the json server

