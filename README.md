# LIRI
node.js LIRI

demo: https://youtu.be/RZYwpJGaALg

## Description
Language Interpretation and Recognition Interface. LIRI is be a command line node app that takes in parameters and gives you back data.

## movie-this
Gives back movie title, release year, IMBD rating, Rotten Tomatoes rating, country, language, plot, and actors.


## spotify-this
Gives back artist(s), song name, preview link, album title.

## concert-this
Gives back venue name, venue location, and date of event in DD/MM/YYYY.

## do-what-it-says
Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

# Technologies Used
* Node.js
* Moment

## Node Package Modules
* Node-Spotify-API
* Axios
* DotEnv

## NODE PACKAGES

```
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var moment = require('moment');

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");
```
## SPOTIFY SEARCH
Function created to call information from Spotify API

```
function getSong() {


  if (process.argv[3] != null) {

    var querySearch = process.argv[3];


  }

  else {

    var querySearch = 'All the Small Things';

  }



  spotify.search({ type: 'track', query: querySearch }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    else {
      //Iterate into spotify object by saving path in variable
      var albumInfo = data.tracks.items;

      //Display Object containing all info: Artist, Song Name, Preview url, Album
      console.log("=========SONG-INFO=============");
      // artist name
      console.log(albumInfo[0].artists[0].name);
      // song name
      console.log(albumInfo[0].name);
      // url
      console.log(albumInfo[0].external_urls.spotify);
      // album names
      console.log(albumInfo[0].album.name);



    }

    // console.log(data); 
  });



};
```

## DO WHAT IT SAYS 
Using the fs package this code reads from a text file and responds accordingly
```
function doIt() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.

    if (dataArr[0] = "spotify-this-song") {

      console.log(dataArr[1])
      var thatway = dataArr[1];

      spotify.search({ type: 'track', query: thatway }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        else {
          var songInfo = data.tracks.items;

          console.log("<<<<<<<<ARTIST:>>>>>>>>");
          console.log(songInfo[0].artists[0].name);
          console.log("<<<<<<<<SONG:>>>>>>>>");
          console.log(songInfo[0].name);
          console.log("<<<<<<<<PREVIEW:>>>>>>>>");
          console.log(songInfo[0].external_urls.spotify);
          console.log("<<<<<<<<ALBUM:>>>>>>>>");
          console.log(songInfo[0].album.name);
        }


      });

    };




  });

};
```

