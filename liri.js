var term = require('terminal-kit').terminal;
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');

//****** twitterKeys *******//
// consumer_key
// consumer_secret
// access_token_key
// access_token_secret

var _TWITTER_CONSUMER_KEY = keys.twitterKeys.consumer_key;
var _TWITTER_CONSUMER_SECRET = keys.twitterKeys.consumer_secret;
var _TWITTER_ACCESS_TOKEN_KEY = keys.twitterKeys.access_token_key;
var _TWITTER_ACCESS_TOKEN_SECRET = keys.twitterKeys.access_token_secret;

var items = ['My Tweets', 'Spotify Song', 'Look Up Movie'];
var options = {
	style: term.inverse ,
	selectedStyle: term.white.bgYellow
};
var welcomeMsg = 'Hi I am LIRI. I can give you song information, movie information, or your latest tweets, what can I do for you?'  + '\r\n\r\n';

//****** SETTING UP TWITTER ******** 
var tweetClient = new Twitter({
	consumer_key: _TWITTER_CONSUMER_KEY,
	consumer_secret: _TWITTER_CONSUMER_SECRET,
	access_token_key: _TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: _TWITTER_ACCESS_TOKEN_SECRET,
})
var myTag = 'ArnoldLei';
var params = {screen_name: myTag}
var lastTweets = function(){
	tweetClient.get('statues/user_timeline', params, function(error, tweets, response){
		if (!error){
			console.log(tweets)
		}
	})
}

term.clear();
term.slowTyping(
	welcomeMsg ,
	{ 
		flashStyle: term.yellow,
		delay: 10, 
	} ,
	function() {
		term.singleLineMenu( items , options , function( error , response ) {
			term( '\n' ).eraseLineAfter.green(
				"#%s selected: %s (%s,%s)\n" ,
				'You have selected:'
				// response.x ,
				// response.y
			);
			process.exit() ;
		} ) ;
	}
) ;


