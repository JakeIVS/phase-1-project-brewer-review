const breweryList = document.querySelector('#brewery-list');
document.addEventListener("DOMContentLoaded", ()=>{
    initialize()
})

function initialize() {
    fetch('https://api.openbrewerydb.org/breweries')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            let li = document.createElement('li');
            li.textContent=`${brewery.name}, ${brewery.country}`;
            breweryList.append(li);
        })
    })
}
