// trying to set it up so when the user visits the site, this polka songs plays once, 
// leanred that most modern web browsers have implemented autoplay policies that restrict autoplaying media- makes sense
// policies typically require some form of user interaction before allowing media to play automatically which is
// why I created the 'play' button at top so when it it clicked, it palys once and disables.

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const playButton = document.getElementById('play-button');  
document.addEventListener("DOMContentLoaded", initialize())
const breweryList = document.querySelector('#brewery-list');
let breweryInfo = {};
let breweries = {};
let favoriteBreweries = {};
function initialize() {
    fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r=>r.json())
    .then(data=>{
        breweries = data;
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
}

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
    fetch('http://localhost:3000/breweries')
    .then(r=>r.json())
    .then(data=>{
        if (data.find(function(currentBrewery){
            return currentBrewery.name === breweryInfo.name
        })) {
            favBtn.className = 'white-mouseoff'
            favBtn.textContent = 'Unfavorite'
        } else {
            favBtn.className = 'mouseoff'
            favBtn.textContent = 'Favorite'
        }
    })
}
// added cityValues and typeValue to function- was only including city before also took out additional fetch
// that was filtering data but not updating the left hand list with results 
 function brewFilter(cityValue, typeValue) { 
    let filteredList = breweries.filter(function (brewery) {
      let isCityMatched = cityValue === '' || brewery.city.toLowerCase().includes(cityValue.toLowerCase());
      let isTypeMatched = typeValue === 'null' || brewery.brewery_type === typeValue;
      return isCityMatched && isTypeMatched;
    })

// Clears existing list
  breweryList.innerHTML = '';
  debugger  

// Displays filtered results
  filteredList.forEach(brewery => {
    listElement(brewery);
    debugger
  });
}
// sets up filter form  to search city and type and added a retrieve to pass it through beerFilter 
    let form = document.querySelector("#filter-form");
        form.addEventListener('submit', (e) => {
        e.preventDefault();
    let cityValue = form.querySelector("#city-field").value;
    let typeValue = form.querySelector("select").value;
    
    brewFilter(cityValue, typeValue);
});

// Show the details of the selected brewery in the center of the page
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
            favoriteBreweries = data;
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
    if (favBtn.textContent === 'Favorite') {
        favBtn.className = 'mouseover'
    } else {
        favBtn.className = 'white-mouseover'
    }
});
favBtn.addEventListener('mouseleave', ()=> {
    if (favBtn.textContent === 'Favorite') {
        favBtn.className = 'mouseoff'
    } else {
        favBtn.className = 'white-mouseoff'
    }
});
favBtn.addEventListener('click', ()=>{
    if (favBtn.textContent === 'Favorite') {
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
                "website_url": breweryInfo.url,
                "phone": breweryInfo.phone,
                "brewery_type": breweryInfo.type
            })
        })
        favBtn.className = 'unfavorite-mouseover'
        favBtn.textContent = 'Unfavorite'
    } else {
        fetch ('http://localhost:3000/breweries')
        .then(r=>r.json())
        .then (data=>data.forEach(brewery=>{
            if (brewery.name === breweryInfo.name) {
                fetch(`http://localhost:3000/breweries/${brewery.id}`,{
                    method:'DELETE',
                    headers:{
                        'content-type': 'application/json',
                        'accepts': 'application/json'
                    }
                })
            }
        }))
        favBtn.className = 'favorite-mouseover'
        favBtn.textContent = 'Favorite'
    }
})

    playButton.addEventListener('click', () => {
      audio.play();
      playButton.disabled = true; // Disable the button after playing
    });
  });