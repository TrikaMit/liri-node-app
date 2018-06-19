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
        }else{
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
            console.log("Song Name: ");
            console.log(song.name)
            console.log("---------------------------------------------------")
            console.log("Artists: ");
                for (var i=0; i<song.artists.length; i++){
                    artistArray.push(song.artists[i].name);
                    artistArray.join(', ')
                }
            console.log(artistArray)
            console.log("---------------------------------------------------")
            console.log("Preview Link of Song: ");
            console.log(song.external_urls.spotify);
            console.log(song.preview_url);
            console.log("---------------------------------------------------")
            console.log("Album: ");
            console.log(song.album.name)
            console.log("---------------------------------------------------")
        })
}

var command = process.argv[2];
var songQuery;
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
        break;
    case 'do-what-it-says':
        console.log("ok");
        break;
    default:
        console.log("sorry")
}
