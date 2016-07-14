var term = require('terminal-kit').terminal;
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');

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

var latestTweets; 

var lastTweets = function(){
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
				 lastestTweets.push(tweets[i].text);
				 console.log(tweets[i].text)
			}
			
		}else{
			term(error)
		}
		
	})
	// process.exit();
}

var printTweets = function(){
	term.slowTyping(
	  	latestTweets.toString() ,
	  	{ 
	  		flashStyle: term.yellow,
			delay: 10, 
	  	},
	 	function(){ process.exit(); }
	 ); 

}


term.clear();

printTweets();
