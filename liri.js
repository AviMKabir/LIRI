require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var moment = require('moment');

var fs = require("fs");


var spotify = new Spotify(keys.spotify);



var axios = require("axios");



var action = process.argv[2];

// console.log(action);

switch (action) {
  case "movie-this":

    getMovie();
    console.log("Getting movie...");

    break;

  case "spotify-this-song":
    getSong();
    console.log("Getting song...");

    break;

  case "concert-this":
    getConcert();
    console.log("Getting concert...");



    break;

  case "do-what-it-says":
    doIt();
    console.log("Loading...");



    break;



  default:
    console.log("dont know how to do that :(");
    break;
};

function getMovie() {


  if (process.argv[3] != null) {

    var movieName = process.argv[3];


  }

  else {

    var movieName = "Mr.+Nobody";

  }





  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);


  // Then create a request with axios to the queryUrl
  // ...

  axios.get(queryUrl).then(
    function (response) {


      console.log("---------------TITLE---------------");
      console.log("Title: " + response.data.Title);

      console.log("---------------RELEASE YEAR---------------");
      console.log("Release Year: " + response.data.Year);

      console.log("---------------IMDB RATING---------------");
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);

      console.log("---------------ROTTEN TOMATOES RATING---------------");
      console.log("IMDB Rating: " + response.data.Ratings[1].Value);

      console.log("---------------COUNTRY---------------");
      console.log("Country: " + response.data.Country);

      console.log("---------------LANGUAGE---------------");
      console.log("Language: " + response.data.Language);

      console.log("---------------PLOT---------------");
      console.log("Plot: " + response.data.Plot);

      console.log("---------------ACTORS---------------");
      console.log("Starring: " + response.data.Actors);


    })
    .catch(function (error) {
      if (error.response) {

        console.log("ERROR");

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });






};


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


function getConcert() {


  if (process.argv[3] != null) {

    var artist = process.argv[3];


  }

  else {

    var artist = "the+1975";

  }





  // Then run a request with axios 
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);


  // Then create a request with axios to the queryUrl
  // ...

  axios.get(queryUrl).then(
    function (response) {


      console.log(response.data[0]);

      // venue name
      console.log("venue name: " + response.data[0].venue.name);

      // venue location
      console.log("venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);

      var showDateRaw = response.data[0].datetime


      var showDateCon = moment(showDateRaw).format("MM/DD/YYYY");
      // console logging converted date
      // console.log(showDateCon);


      // venue date
      console.log("venue date: " + showDateCon);

      // this is the date variable




    })
    .catch(function (error) {
      if (error.response) {

        console.log("ERROR");

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });






};

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