document.addEventListener('DOMContentLoaded', initialize);
let breweryList = document.querySelector('#brewery-list'); 
let originalData = []; // this stores the original data from the API for filtering, I was missing earlier causing issues

function initialize() {
  fetch('https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=700')
    .then(r => r.json())
    .then(data => {
      originalData = data; // this stores the original data for filtering
      data.forEach(brewery => {
        listElement(brewery.name, brewery.city);
        // had a cities.push here, but removed it- it was causing hicups 
      });
    });
}
function listElement(breweryName, city) {
    let li = document.createElement('li');
    li.textContent = `${breweryName}, ${city}`;
    document.querySelector("#brewery-list").appendChild(li);
  }

  // added cityValues and typeValue to function- was only including city before also took out additional fetch
// that was filtering data but not updating the left hand list with results 
  function brewFilter(cityValue, typeValue) { 
    let filteredList = originalData.filter(function (brewery) {
      let isCityMatched = cityValue === '' || brewery.city.toLowerCase().includes(cityValue.toLowerCase());
      let isTypeMatched = typeValue === 'null' || brewery.brewery_type === typeValue;
      return isCityMatched && isTypeMatched;
    })

// Clears existing list
  breweryList.innerHTML = '';

// Displays filtered results
  filteredList.forEach(brewery => {
    listElement(brewery.name, brewery.city);
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

// trying to set it up so when the user visits the site, this polka songs plays once, 
// leanred that most modern web browsers have implemented autoplay policies that restrict autoplaying media- makes sense
// policies typically require some form of user interaction before allowing media to play automatically which is
// why I created the 'play' button at top so when it it clicked, it palys once and disables.

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const playButton = document.getElementById('play-button');
  
    playButton.addEventListener('click', () => {
      audio.play();
      playButton.disabled = true; // Disable the button after playing
    });
  });