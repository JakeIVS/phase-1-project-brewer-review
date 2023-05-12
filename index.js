// const breweryList = document.querySelector('#brewery-list');


function initialize() {
    fetch('https://api.openbrewerydb.org/breweries')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            let li = document.createElement('li');
            li.textContent=`${brewery.name}, ${brewery.country.italics()}`;
            breweryList.append(li);
        })
    })
}

function testApi() {
    fetch('https://api.openbrewerydb.org/breweries')
    .then(r=>r.json())
    .then(data=>data.forEach(d=>{
        console.log(d.state);
    }))
}

testApi();