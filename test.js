var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id:'beb074d2272b44249107d8d5505338db',
  secret:'b312f4a48bbd47af9e92cac5be6c0a24'
});
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
