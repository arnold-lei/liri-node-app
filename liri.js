var term = require('terminal-kit').terminal;
var keys = require('./keys');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');

var selection; 

//****** twitterKeys *******//
// consumer_key
// consumer_secret
// access_token_key
// access_token_secret

var _TWITTER_CONSUMER_KEY = keys.twitterKeys.consumer_key;
var _TWITTER_CONSUMER_SECRET = keys.twitterKeys.consumer_secret;
var _TWITTER_ACCESS_TOKEN_KEY = keys.twitterKeys.access_token_key;
var _TWITTER_ACCESS_TOKEN_SECRET = keys.twitterKeys.access_token_secret;

var items = ['My Tweets', 'Spotify Song', 'Look Up Movie', 'Exit'];
var options = {
	style: term.inverse ,
	selectedStyle: term.white.bgYellow
};
var welcomeMsg = 'Hi I am LIRI. I can give you song information, movie information, or your latest tweets, what can I do for you?'  + '\r\n\r\n';

//****** SETTING UP TWITTER ******** 
var lastTweets = function(callback){
	var tweetClient = new Twitter({
		consumer_key: _TWITTER_CONSUMER_KEY,
		consumer_secret: _TWITTER_CONSUMER_SECRET,
		access_token_key: _TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: _TWITTER_ACCESS_TOKEN_SECRET,
	})
	var myTag = 'ArnoldLei';
	var params = {screen_name: myTag}
	var latestTweets;

	tweetClient.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error){
			for (var i = 0; i < 10; i++){
				var results = '@' + tweets[i].user.screen_name +': ' +  tweets[i].text+ '\r\n';
				console.log(results); 
			}
			
		}else{
			term(error)
		};
		liri()
	})
	// process.exit();
}

var omdbSerach = function(){
	var omdbApi = 'http://www.omdbapi.com/?';
	request(omdbApi, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var results = 
        "Title: " + JSON.parse(body)["Title"] + "\r\n";
      console.log(results); 
	  }
	})
}

var spotifySearch = function(){
	inquirer.prompt({
		name: 'song',
		message: 'Please tell us what song you want to search?',
		type: 'input'
	}).then(function(search){
		spotifyParse(search);
	})

}

var spotifyParse = function(search){
	spotify.search({ type: 'track', query: search }, function(error, data) {
	    if(error) {
	      console.log('Error occurred: ' + error);
	      return;
	    }
	    var albumInfo = data.tracks.items[0];
	    var spotifyResults = 
	      "Artist: " + albumInfo.artists[0].name + "\r\n" +
	      "Track Name: " + albumInfo.name + "\r\n" +
	      "Album: " + albumInfo.album.name + "\r\n" +
	      "Preview Link: " + albumInfo.preview_url + "\r\n\r\n";
	    console.log(spotifyResults);
  })
}

var intro = function(callback){
	term.slowTyping(
		welcomeMsg ,
		{ 
			flashStyle: term.yellow,
			delay: 10, 
		},
		function(){
			callback()
		}
		// function() {
		// 	term.singleLineMenu( items , options , function( error , response) {
		// 		term( '\n' ).eraseLineAfter.green(
		// 			"#%s selected: %s (%s,%s)\n" ,
		// 			response.selectedText,
		// 			response.x,
		// 			response.y,
		// 			term(lastTweets()),
		// 			// response(lastTweets())
					
		// 			setTimeout(function(){ process,exit(); }, 3000) 
		// 		);
			
		// 	} );
		// }
	) ;

}

var liri = function(){

	inquirer.prompt({
		name: 'ans',
		message: 'Choose an option:',
		type: 'rawlist',
		choices: items
	}).then(function(ans){
		console.log(ans.ans)
		switch(ans.ans) {
			case 'My Tweets':
				console.log('this is from the console');
				lastTweets();
				break;
			case 'Spotify Song':
				spotifySearch()
				console.log('Spotify Song');
			break;

			case 'Look Up Movie':
				console.log('Look Up Movie');
			break;
			case 'Exit':
				process.exit();
			break;
		}
	});
}
term.clear();
intro(liri);
// intro();

// spotifySearch('Bruno Mars')
// liri()

// omdbSerach('Top Gun');


