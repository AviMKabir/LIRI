var axios = require("axios");



var action = process.argv[2];

// console.log(action);

switch (action) {
    case "movie-this":

        getMovie();
        console.log("Getting movie...");

        break;

    case "deposit":

        
        break;

        case "withdraw":

                
                break;

    default:
        console.log("dont know how to do that :(");
        break;
};

function getMovie () {


    var movieName = process.argv[3];

    


    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    
    // Then create a request with axios to the queryUrl
    // ...
    
    axios.get(queryUrl).then(
      function(response) {
    
        console.log("SUCCESS");
        
    
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
      .catch(function(error) {
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


