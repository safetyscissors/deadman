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
//EXAMPLE
$('#firstButton').click(function(){
	var userInput = getInput();
	setOutput(userInput);
});

$('#raw')[0].oninput = function(){
	//save and reset input field
	data.guesses.push(getGuessFromFront());
	checkRemainingWords();
	//do action on the changed data
	updateFront();
};

/* -------------------------------------------- *\
 * functions
\* -------------------------------------------- */
function initData(){
	//creates a property called guesses and makes it an array
	data.guesses = [];
	data.blanks = new Array(3);

	updateFront();
}

//EXAMPLE
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

//EXAMPLE
function setOutput(message){
	if(message == false){
		message = 'my output';
	}
	$('#textOutput').html('set output says:'+message);
	$('#textOutput').append('<br>');
	$('#textOutput').append(data.guesses.join(','));
}





function getGuessFromFront(){
	//get value in guess. skip if its blank.
	var guess = $('#guess').val();
	if(!guess) return;

	//log and return the guess.
	logger('input added guess:' + guess);
	return guess;
}

function updateFront(){
	//clear the input
	$('#guess').val('');

	//add the guesses
	var guessMsg = 'guessed:' + data.guesses.join(', ');
	$('#allGuesses').html(guessMsg);

	//add the to be guessed
	var letters = ('abcdefghijklmnopqrstuvwxyz').split('');
	var remainingMsg = 'remaining:' + (_.difference(letters, data.guesses)).join(', ');
	$('#remaining').html(remainingMsg);

	//draw blanks
	var blankMsg = 'blanks: ';
	_.each(data.blanks, function(blankValue){
		if(!blankValue) blankValue = '_';
		blankMsg += blankValue + ' ';
	});
	$('#blanks').html(blankMsg);
}
