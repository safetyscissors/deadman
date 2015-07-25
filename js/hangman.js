/* --------------------------------------------- *\
 * initialize script
\* --------------------------------------------- */
function logger(msg){
	console.log(msg);
}

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
function getInput(){
	return $('#firstInput').val();
}

function setOutput(message){
	if(message == false){
		message = 'my output';
	}
	$('#textOutput').html('set output says:'+message);
}
