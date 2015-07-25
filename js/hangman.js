/* --------------------------------------------- *\
 * initialize script
\* --------------------------------------------- */
function logger(msg){
	console.log(msg);
}

initData();
logger("hangman code loaded");

/* -------------------------------------------- *\
 * listeners
\* -------------------------------------------- */
$('#firstButton').click(function(){
	var userInput = getInput();
	setOutput(userInput);
});

/* -------------------------------------------- *\
 * functions
\* -------------------------------------------- */
function initData(){
	//creates a property called guesses and makes it an array
	data.guesses = [];
}

function getInput(){
	//get userinput from input field
	var userInput = $('#firstInput').val();
	
	//only if not blank, add input to the guesses array
	if(userInput != ''){
		data.guesses.push(userInput);
		logger(data.guesses);
	}

	//return the users guess
	return userInput
}

function setOutput(message){
	if(message == false){
		message = 'my output';
	}
	$('#textOutput').html('set output says:'+message);
	$('#textOutput').append('<br>');
	$('#textOutput').append(data.guesses.join(','));
}
