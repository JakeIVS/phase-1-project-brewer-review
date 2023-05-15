// // const breweryList = document.querySelector('#brewery-list');
// document.addEventListener("DOMContentLoaded", initialize)

// function initialize() {
//     // console.log("initalize")
//     fetch('https://api.openbrewerydb.org/breweries')
//     .then(r=>r.json())
//     .then(data=>{
//         data.forEach(brewery => {
//             listElement(brewery.name, brewery.state)
//         })
//     })
// }

// function testApi() {
//     fetch('https://api.openbrewerydb.org/breweries')
//     .then(r=>r.json())
//     .then(data=>data.forEach(d=>{
//         // console.log(d.state);
//     }))
// }

// testApi();

// function listElement(breweryName,state){
//     // console.log ("creatingElement")
//     let li = document.createElement('li');
//     li.textContent=`${breweryName}, ${state}`;
//     document.querySelector("#brewery-list").appendChild(li);
// };

const breweryList = document.querySelector('#brewery-list');

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
        console.log(d.brewery_type);
    }))
}
let imageContainer = document.getElementById('image-container')

for (let i = 0; i < 3; i++) {

let img1 = document.createElement('img');
    img1.src = 'src/brew-bar-img-1.jpg' 
    imageContainer.appendChild(img1);

let img2 = document.createElement('img');
    img2.src = 'src/brew-bar-img-2.jpg' 
    imageContainer.appendChild(img2);
}
