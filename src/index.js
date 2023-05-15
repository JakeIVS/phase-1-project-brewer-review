document.addEventListener('DOMContentLoaded', initialize())
const breweryList = document.querySelector('#brewery-list');
function initialize() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=>{
        const cities = [];
        data.forEach(brewery => {
            listElement(brewery.name, brewery.city)
            cities.push(brewery.city)
        }) 
        // console.log (cities);
    })
}
function listElement(breweryName,city){
    let li = document.createElement('li');
    li.textContent=`${breweryName}, ${city}`;
    document.querySelector("#brewery-list").appendChild(li);
};
function brewFilter(cityValue){
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=> {
        newList = data.filter(function(brewery){
            return brewery.city === cityValue 
        })
        console.log(newList);
    })
}
form = document.querySelector("#filter-form")
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    let cityValue = form.querySelector("#city-field").value 
    brewFilter(cityValue);
})