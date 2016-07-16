var term = require('terminal-kit').terminal;
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');
var selection; 
var welcomeMsg = 'Hi I am LIRI. I can give you song information, movie information, or your latest tweets, what can I do for you?'  + '\r\n\r\n';

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
		
	});	// process.exit();
}
term.clear();	
// term.slowTyping(
// 	welcomeMsg,
// 	{
// 		flashStyle: term.yellow,
// 		delay:10
// 	},
// 	function(){
// 		process.exit();
// 	}
// );
var questions = [
  {
    type: 'message',
    name: 'first_name',
    message: 'What\'s your first name'
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'What\'s your last name',
    default: function () {
      return 'Doe';
    }
  },
  {
    type: 'input',
    name: 'phone',
    message: 'What\'s your phone number',
    validate: function (value) {
      var pass = value.match(/^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    }
  }
];

inquirer.prompt(questions).then(function (answers) {
  console.log(JSON.stringify(answers, null, '  '));
});

var printTweets = function(){
	term.slowTyping(
	  	term(latestTweets) ,
	  	{ 
	  		flashStyle: term.yellow,
			delay: 10, 
	  	},
	 	function(){ process.exit(); }
	 ); 

}


// printTweets();
