require("dotenv").config();
var request = require('request')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//displays all tweets account has tweeted. called within switch function
function displayTweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            console.log("Here are your latest Tweets!")
            for (var i = tweets.length - 1; i > -1; i--) {
                console.log("#" + [tweets.length - i] + ") " + tweets[i].text)
            }
        } else {
            console.log("Sorry, there seems to be an error. Please try again.")
        }
    })
}

//displays all song info based on search query 
function displaySong(songQuery) {
    spotify
        .search({
            type: 'track',
            query: songQuery
        })
        .then(function (data) {
            var song = data.tracks.items[0];
            var artistArray = [];
            // console.log(song)
            // console.log(data.tracks.items[0]);
            console.log("Song Name: " + song.name);
            console.log("---------------------------------------------------")
            for (var i = 0; i < song.artists.length; i++) {
                artistArray.push(song.artists[i].name);
                artistArray.join(', ')
            }
            console.log("Artists: " + artistArray)
            console.log("---------------------------------------------------")
            console.log("Preview Link of Song: " + song.preview_url);
            // console.log(song.external_urls.spotify);
            console.log("---------------------------------------------------")
            console.log("Album: " + song.album.name);
            console.log("---------------------------------------------------")
        })
}
//displays OMDB info
function displayMovie(movieURL) {
    request(movieURL, function(error, response, body){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:')
        // console.log(body)
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("---------------------------------------------------");
        console.log("Year: " + JSON.parse(body).Year);
        console.log("---------------------------------------------------");
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
        console.log("---------------------------------------------------")
        // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
        console.log("---------------------------------------------------")
        console.log("Country where movie was produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("---------------------------------------------------");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("---------------------------------------------------")
        console.log("Actors: " + JSON.parse(body).Actors)
        console.log("---------------------------------------------------")
    });
};

var command = process.argv[2];
var songQuery;
var movieQuery = [];
var movieURL;

switch (command) {
    case 'my-tweets':
        displayTweets();
        break;
    case 'spotify-this-song':
        console.log("Here is this song on spotify:");
        if (process.argv[3]) {
            songQuery = process.argv[3]
            displaySong(songQuery)
        } else {
            displaySong('The Sign Ace of Base');
        }
        break;
    case 'movie-this':
        console.log('movie stuff');
        if (process.argv[3]){
            for (var i = 3; i < process.argv.length; i++){
                movieQuery.push(process.argv[i]);
            }
            movieQuery = movieQuery.join('+');
            movieURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieQuery;
            displayMovie(movieURL)
        
        }else {
            movieQuery = "Mr.Nobody";
            movieURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieQuery;
            displayMovie(movieURL);
        }
        break;
    case 'do-what-it-says':
        console.log("ok");
        break;
    default:
        console.log("sorry")
}





