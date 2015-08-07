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
function hypothesize(callback){
  var guessesCopy = data.guesses.slice(0);
  var lastGuess = guessesCopy.pop();
  var bestHypothesis = {
    wordList:[]
  };

  async.forEachOf(data.blanks,
    //iterator
    function iterator(item, key, eachCallback){
      var blanksCopy = data.blanks.slice(0);
      if(blanksCopy[key]) return eachCallback();

      blanksCopy[key] = lastGuess;
      requestWordFindData(blanksCopy, function(rawHtml){
        //get the next set of words
        var wordList = getWordListFromHtml(rawHtml);
        wordList = wordsLessGuessedLetters(guessesCopy, wordList);

        //save if its best option.
        if(wordList.length>bestHypothesis.wordList.length){
          bestHypothesis.wordList = wordList;
          bestHypothesis.guesses = guessesCopy;
          bestHypothesis.blanks = blanksCopy;
        }

        eachCallback();
      });
    },
    //on complete
    function done(eachError){
      callback(eachError, bestHypothesis);
    }
  );
}


function checkRemainingWords(){
  //check if we have a wordList
  if(!data.wordList){
    requestWordFindData(data.blanks, function(rawHtml){
      data.wordList = getWordListFromHtml(rawHtml);

      //re call itself to process the data
      return checkRemainingWords();
    })
  }else{

    //default next state;
    var nextState = {
      blanks:data.blanks,
      guesses:data.guesses,
      wordList:wordsLessGuessedLetters(data.guesses, data.wordList)
    };

    //consider giving up the letter if there are fewer possibilities
    hypothesize(function(error, bestHypothesis){
      if(error) console.log(error);
      if(bestHypothesis.wordList.length > nextState.wordList.length) nextState = bestHypothesis;
      logger('hypothesis: ' + JSON.stringify(bestHypothesis));
      logger('nextState: ' + JSON.stringify(nextState));

      //change data then do visual action
      data = nextState;
      updateFront();
    });
  }
}

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