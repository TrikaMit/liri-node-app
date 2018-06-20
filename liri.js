require("dotenv").config();
var request = require('request')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//displays all tweets account has tweeted. called within switch function
function displayTweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            console.log("Here are your latest Tweets!")
            fs.appendFile('log.txt', "Here are your latest Tweets!: \n", function(){})
            for (var i = tweets.length - 1; i > -1; i--) {
                var tweetData = "#" + [tweets.length - i] + ") " + tweets[i].text
                console.log(tweetData)
                fs.appendFile('log.txt', tweetData + "\n", function(){
                })
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
            var songName = "Song Name: " + song.name;
            var artistName;
            var songLinkName = "Preview Link of Song: " + song.external_urls.spotify;
            var albumName = "Album: " + song.album.name;
            for (var i = 0; i < song.artists.length; i++) {
                artistArray.push(song.artists[i].name);
                artistArray.join(', ')
                artistName = "Artists: " + artistArray
            }
        dataWrite = [];
        dataWrite.push(songName, artistName, songLinkName, albumName)
        console.log(dataWrite.join(', \n'));
        fs.appendFile('log.txt', dataWrite.join(', \n ') + "\n", function(){
        })
        })
}
//displays OMDB info
function displayMovie(movieURL) {
    request(movieURL, function(error, response, body){
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        bS = JSON.parse(body);
        var movieTitle = "Movie Title: " + bS.Title;
        var movieYear = "Year: " + bS.Year;
        var IMDBRating = "IMDB Rating: " + bS.imdbRating;
        var RTRating = "Rotten Tomatoes Rating: " + bS.Ratings[1].Value;
        var movieCountry = "Country where movie was produced: " + bS.Country;
        var movieLanguage = "Language: " + bS.Language;
        var moviePlot = "Plot: " + bS.Plot;
        var movieActors = "Actors: " + bS.Actors;
        dataWrite = [];
        dataWrite.push(movieTitle, movieYear, IMDBRating, RTRating, movieCountry, movieLanguage, moviePlot, movieActors)
        console.log(dataWrite.join(', \n'))
        fs.appendFile('log.txt', dataWrite.join(', \n') + "\n", function(){
        })
    });
};

function readingFile() {
    fs.readFile('random.txt', 'UTF-8', function(err,data){
        console.log(data);
        var data1 = data.split(',');
        data1new = data1[1].replace(/['"]+/g, '');
        displaySong(data1new);
    })
}

var command = process.argv[2];
var songQuery = [];
var movieQuery = [];
var movieURL;

switch (command) {
    case 'my-tweets':
        displayTweets();
        break;
    case 'spotify-this-song':
        console.log("Here is this song on spotify:");
        if (process.argv[3]) {
                for (var i = 3; i < process.argv.length; i++){
                songQuery.push(process.argv[i]);
            }
            songQuery = songQuery.join(' ');
            displaySong(songQuery)
        } else {
            displaySong('The Sign Ace of Base');
        }
        break;
    case 'movie-this':
        console.log('Here is the information for your movie: ');
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
        console.log("Ok, reading file...");
        readingFile();
        break;
    default:
        console.log("Sorry, you did not enter a valid command.")
}


// startSearch(command);






