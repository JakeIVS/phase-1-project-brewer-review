document.addEventListener("DOMContentLoaded", initialize())
const breweryList = document.querySelector('#brewery-list');
function initialize() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            listElement(brewery.name, brewery.city)
        })
    })
}
function listElement(breweryName,city){
    let li = document.createElement('li');
    li.textContent=`${breweryName}, ${city}`;
    document.querySelector("#brewery-list").appendChild(li);
};
