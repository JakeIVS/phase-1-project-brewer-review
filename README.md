--BREWFINDER--
BrewFinder is a Webpage that can be used to find and filter up to 200 Colorado breweries from a free brewery API. 

--DESCRIPTION--
Clicking on a brewery in the brewery list on the left will bring up the details of that brewery. These details include name, address, city, phone number, website link, brewery type (micro-brewery, large brewery, etc.), and the location on a google map widget.

The brewery list can be filtered by city and/or brewery type, using the form above the details card. You can also filter the list using a zip code locator form, which will show all breweries within the entered zip code or, if there are none in the entered zip code, will list breweries from the next closest zip code numerically.

On the details card, there is a button that can be used to add or remove a brewery to your favorites list. Your favorites list can be accesed via a star button on the top right of the Brewery List. (Note: the favorites list utilizes the db.json file, and will only function if you are running the json server.

--INSTALLATION--
For the website to function properly, navigate to the repository in your directory and, in the console, run:

    json-server --watch db.json

This will allow you to fetch the favorites list, allowing you to view and change your favorite breweries.

