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
    let street = document.querySelector('#details-street')
    let cityState = document.querySelector('#details-city-state')
    let type = document.querySelector('#details-type')
    let url = document.querySelector('#details-url')
    let phone = document.querySelector('#phone-number')
    breweryInfo = {
        name: brewery.name,
        street: brewery.street,
        state: brewery.state,
        city: brewery.city,
        url: brewery.website_url,
        phone: brewery.phone,
        type: brewery.brewery_type 
    }
    name.textContent = breweryInfo.name;
    street.textContent = breweryInfo.street;
    cityState.textContent = `${brewery.city}, ${breweryInfo.state}`;
    type.textContent = breweryInfo.type;
    url.href = breweryInfo.url;
    phone.textContent = `(${breweryInfo.phone.slice(0, 3)}) ${breweryInfo.phone.slice(3, 6)}-${breweryInfo.phone.slice(6)} `;
}
// add a favorite button that switches the list to your favorited breweries
let favSwap = document.querySelector('#favorites-btn')
favSwap.addEventListener('mouseenter', ()=> {
    favSwap.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
});
favSwap.addEventListener('mouseleave', ()=> {
    favSwap.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
});
favSwap.addEventListener('click', ()=>{
    if (favSwap.textContent === '☆') {
        favSwap.textContent = '★'
        fetch('http://localhost:3000/breweries')
        .then(r=>r.json())
        .then(data=>{
            breweryList.innerHTML = ''
            data.forEach(brewery=>{
                listElement(brewery);
            })
            populateDetails(data[0]);
        })
    } else {
        favSwap.textContent = '☆'
        breweryList.innerHTML = ''
        initialize()
    }
})
// add a favorite button to the details page that adds the current brewery to the json server
let favBtn = document.querySelector('#details-favorite')
favBtn.addEventListener('mouseenter', ()=> {
    favBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
});
favBtn.addEventListener('mouseleave', ()=> {
    favBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
});
favBtn.addEventListener('click', ()=>{
    fetch('http://localhost:3000/breweries',{
        method: "POST",
        headers:{
            "content-type":"application/json",
            "accept":"application/json"
        },
        body:JSON.stringify({
            "name": breweryInfo.name,
            "street": breweryInfo.street,
            "state": breweryInfo.state,
            "city":breweryInfo.city,
            "url": breweryInfo.url,
            "phone": breweryInfo.phone,
            "type": breweryInfo.type
        })
    })
})
