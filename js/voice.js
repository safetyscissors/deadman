if(!('webkitSpeechRecognition' in window)){
  upgrade();
}else{
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = function(event){
    showLastVoice(event)
  };

  recognition.start()
}


function showLastVoice(e) {
  for(var i= e.resultIndex; i< e.results.length;++i){
    var letter = e.results[i][0].transcript.toLowerCase().replace(/ /g,'');
    letter = dictionaryReplace(letter)

    console.log(letter);

    if(!$('#speech').hasClass('disabled')) {
      $('#speech').html(letter);

      if (e.results[i].isFinal) {
        if (letter.length == 1 && letter.match(/[a-z]/i)) {

          $('#guess').val(letter);
          data.guesses.push(getGuessFromFront());
          checkRemainingWords();
        }
      }
    }
  }
}

function dictionaryReplace(letter){
  var dictionary = {
    '8':'a',
    'be':'b',
    'beat':'b',
    'eat':'e',
    'cay':'k',
    'oh':'o',
    'okay':'o',
    'you':'u',
    'why':'y'
  };

  if(dictionary[letter]){
    return dictionary[letter]
  }
  return letter;
}