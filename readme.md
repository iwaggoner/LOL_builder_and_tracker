# LOL-builder-tracker

This is a full stack Express and Postgres app that allows the user to sign in and store there faviorte items, champions, and summoners from the game league of legends.
 - Has models for user, items, champions, and summoners
 - Used sequelize to create models and migrations for all three models
 - Uses controllers and views with EJS middleware to access each view
 - One static API and another riot games development API with 24 hour key until approved by Riot Games

## More Informaiton on API usage

All the data that for this app is pulled using node package axios from a API called Data Dragon the docs are linked below (https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html) this is a static API that requires no key.

Another API is used in this app but it's use is still in development as the Riot Development key only last 24 hours until the personal project is approved by Riot games, this API searches for summoners/gamertags in the game league of legends and pulls data on them in this app. The docs to this API have been linked below. (https://developer.riotgames.com/apis)

## Database Informatoin

In this app a psql database is used to store users, and there selected favorite items, champions, and summoners. Node sequelize was implmented to create models and migrations for all of these tables including users. 

Users passwords are hashed and secured using bcrpyt, also passport is used to help verifiy that users are signed in while using the app. 

The app is formated using node express and ejs with views and controllers and a public file for css and images. Dotenv is used to hide the develpment key from Riot  and nodemon used for testing. 

## Framwork

Finaly the framwork bulma was used but node version is not needed feel free to remove from package.json before running npm install. Node body-parser and method-override are used to help CRUD our database with users favoirtes. 

## CRUD

This app allows the user to add items, champions, and summoners to seprate table saved in psql. Each element of each table is able to be deleted, also the roles of each champion can be updated. Summoners gamestages and levels can be updated in the data base as well.

### Cool Features of the app

Some cool featurs of the app are that a user can save a champion and check the base stats of the champ from levels 1-18 and when a champ is selected it will show the lore and passive of the champion with image. 

Still in the works are more details on summoners match history, if a riot API key is used in the .env file the app can search for a summoner by gamertag and when found the summoner can be faviortied and more details can be search like the summoners rank in solo queue, number of games played, and there most played champions, but only if a riot API key is used in the .env file.

