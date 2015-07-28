logger("network manager loaded");

/* ************************************************************* *\
 * init
\* ************************************************************* */

function exampleTurn() {
  var currentGuesses = ['a', 'e', 'o', 'u'];
  requestWordFindData(new Array(3), function (rawHtml) {
    var wordList = getWordListFromHtml(rawHtml);
    wordList = wordsLessGuessedLetters(currentGuesses, wordList);

    console.log(wordList);
  });
}

/* ************************************************************* *\
 * listeners
\* ************************************************************* */

/* ************************************************************* *\
 * functions
\* ************************************************************* */
function requestWordFindData(wordArray, callback){
	wordArray = _.map(wordArray, function(word){
		return word || '?'
	});
	
	var reqOptions = {
		method:'post',
		url:'server.php',
		data:{numberOfLetters:wordArray.length, word:wordArray.join('')}
	};

	logger(reqOptions);

	$.ajax(reqOptions).done(function(msg){
    logger('grabbed raw html');
    callback(msg);
	});
}

function getWordListFromHtml(rawHtml){
  var wordList = [];
  var structured = rawHtml.split('href="/word/');

  //skip the first entry cause it has loads of gibberish.
  structured.shift();

  //loop through structured data, cut off pieces, and add it to the wordlist.
  _.each(structured, function(line){
    var endOfLine = line.indexOf('/"');
    if(endOfLine >= 0) {
      wordList.push(line.substring(0,endOfLine));
    }
  });

  return (wordList);
}

function wordsLessGuessedLetters(guesses, wordList){
  var unguessed = [];
  var regex = new RegExp('[' + guesses.join('') + ']');

  _.each(wordList, function (word) {
    if(!word.match(regex)){
      unguessed.push(word);
    };
  });
  return unguessed;
};