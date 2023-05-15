// const breweryList = document.querySelector('#brewery-list');
document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    console.log("initalize")
    fetch('https://api.openbrewerydb.org/breweries')
    .then(r=>r.json())
    .then(data=>{
        data.forEach(brewery => {
            listElement(brewery.name, brewery.state)
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

function listElement(breweryName,state){
    console.log ("creatingElement")
    let li = document.createElement('li');
    li.textContent=`${breweryName}, ${state}`;
    document.querySelector("#brewery-list").appendChild(li);
}

function beerBarImg() {
    const imageContainer = document.getElementById('image-container');

        const img = document.createElement('img');
        img.src = `src/image${i}.jpg`; 
        imageContainer.appendChild(img);
    }

beerBarImg();