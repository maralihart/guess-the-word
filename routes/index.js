var express = require('express');
var router = express.Router();

const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Creates a route at /play-game that Twilio will POST to
router.post('/play-game', (req, res) => {
  // creates a new instance of the MessagingResponse object
  const twiml = new MessagingResponse();

  const incomingMsg = req.body.Body.toLowerCase().trim();

  // could be any lowercase word!
  const word = 'twilio';

  /* 
 * Helper functions to handle game play 
 */
  
const handleNewGame = () => {
  req.session.wordState = new Array(word.length).fill('_');
  req.session.lives = 5;
  req.session.playing = true;
  twiml.message(`Text back one letter at a time to try and figure out the word. If you know the word, text the entire word!\n\nYou have ${req.session.lives} lives left. \n\n ${req.session.wordState.join(' ')}`);
}

/* 
 * Helper functions to handle game play 
 */

const handleInvalidSMS = () => twiml.message('To start a new game, send start!');  

/* 
 * Helper functions to handle game play 
 */

const checkForSuccess = () => {
  if (incomingMsg == word) { return 'win' }
  if (word.includes(incomingMsg)) { return 'match' }
  return false;
}

/* 
 * Helper functions to handle game play 
 */

const handleGameOver = msg => {
  req.session.destroy();
  twiml.message(msg);
}

/* 
 * Helper functions to handle game play 
 */

const handleBadGuess = () => {
  req.session.lives--;
                
  if (req.session.lives == 0) {
   handleGameOver('Oh no, you ran out of lives! Game over.');
  } else {
    twiml.message(`Nope, that was incorrect. You have ${req.session.lives} lives left.`);
  }
}

/* 
 * Helper functions to handle game play 
 */

const handleMatch = () => {
  for (let [i, char] of [...word].entries()) {
    if (char == incomingMsg) {
      req.session.wordState[i] = incomingMsg;
    }
  }
  
  if (req.session.wordState.join('') == word) {
    handleGameOver('You guessed the word! You win!')
  } else {
    console.log(req.session.wordState.join(' '));
    twiml.message(`You got a letter! \n\n${req.session.wordState.join(' ')}`);
  }
}

  /* 
  * Game play logic 
  */

  if (!req.session.playing) {
    if (incomingMsg == 'start') {
      handleNewGame();
    } else {
      handleInvalidSMS();
    }
  } else {
    const winOrMatch = checkForSuccess();

    if (!winOrMatch) {
        handleBadGuess();
    } else if (winOrMatch == 'win') {
        handleGameOver('You guessed the word! You win!');
    } else {
        handleMatch();
      }  
  }

  // sends the response back to the user
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

module.exports = router;