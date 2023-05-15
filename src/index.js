const breweryList = document.querySelector('#brewery-list');
document.addEventListener("DOMContentLoaded", ()=>{
    initialize()
})

function initialize() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            let li = document.createElement('li');
            li.textContent=`${brewery.name}, ${brewery.city}`;
            breweryList.append(li);
        })
    })
}
