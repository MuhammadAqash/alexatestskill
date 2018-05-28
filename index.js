module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );



// THIS FUNCTION RUNS WHEN THE SKILL IS INVOKED
app.launch( function( request, response ) {
	response.say( 'Ready to note a topic name' );	// initial response from alexa
	response.reprompt( 'I am waiting for instructions' )	// this message is heard if alexa did not hear anything from user
	response.shouldEndSession(false);
} );

app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};


// TO FIND OUT WHEN THE SESSION ENDS
app.sessionEnded(function(request, response) 
{
	response.say("Topic is closing");
	console.log("session ended");
});



// NOTE TAKING INTENT
app.intent('topic',
  {
    "slots":{"topic":"AMAZON.Actor"}
	,"utterances":[ 
		"Create topic {topic}",
                "Select topic {topic}",
                "Add topic {topic}"
		]
  },
  function(request,response) 
  {
    var topic = request.slot('topic');
	if (typeof(topic) != "undefined")
	{
		response.say("Your topic: " + topic + " was created.");
	}
	else
	{
		response.say("Pardon me. I could not hear a topic.");
	}
	
	// todo: connect to database and send entry
	
	// establish a connection with the remote database server
	// run a query to insert the row
	// (optional) inform the user that 'Success'
	
  }
);


// MANUAL ENDING OF THE SESSION INTENT
app.intent('endSession',
  {
    "slots":{"note":"AMAZON.Actor"}
	,"utterances":[ 
		"thank you",
		"bye",
		"bye bye",
		"stop minute taker"
		]
  },
  function(request,response) 
  {
    response.say("Sure");
	response.shouldEndSession(true);
  }
);


module.exports = app;
