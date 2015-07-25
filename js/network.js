logger("network manager loaded");

/* ************************************************************* *\
 * init
\* ************************************************************* */
requestWordFindData(new Array(3));
/* ************************************************************* *\
 * listeners
\* ************************************************************* */

/* ************************************************************* *\
 * functions
\* ************************************************************* */
function requestWordFindData(wordArray){
	wordArray = _.map(wordArray, function(word){
		return word || '?'
	});
	
	var reqOptions = {
		method:'post',
		url:'server.php',
		data:{numberOfLetters:wordArray.length, word:wordArray.join('')}
	}
	logger(reqOptions);

	$.ajax(reqOptions).done(function(msg){
		console.log(msg);
		console.log('done');
	});
}
