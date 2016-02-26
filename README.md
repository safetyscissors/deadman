# Deadman
A game where the only way to win is not to play.

## What?
This is hangman. Human vs computer. To start, you set the word length and begin guessing letters. Instead of randomly picking a word, the computer will instead keep a list of all possible words, of the right length, that dont include already guessed letters.

The computer player will give up a letter if there are more possible options by revealing it rather than discarding all possible words with that letter. 


## Install
its a web app with client and server. The app must be on a server or localhost to properly run ajax and server.php. Otherwise, just open index.html and you're good.

## The instructions.
The computer takes a bit to think. especially when processing text.
- It starts on your turn. Click on the text box if it isnt already selected.
- say your first letter clearly. 
- your guess will appear on screen as grey 
- if your guess is wrong, quickly say it again while it is grey. 
- once its black, the computer will think. 

## How?
Scrabble dicitonary online is amazing and offers a tool to find all words with specific letters. 
- start with a list of all scrabble dictionary words
- with each guess, send a request to scrabble dictionary to get a list of words with that letter and without it
- based on the lists, it decides on whether to give the letter to the user, or discard words

It is a web based game with **async** and **jquery** on the front and **php** on the back. It ties into the **webkit speech recognition** to allow verbal guessing and to the **online scrabble dictionary api**.

