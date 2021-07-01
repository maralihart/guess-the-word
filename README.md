# Twilio Hangman with Express

A GitHub walkthrough based off of this [tutorial](https://www.twilio.com/blog/sms-word-guessing-game-node-js-express-twilio)

## Prereqs

1. Have a valid SMS number that can be used for testing
2. Have [Node.js](https://nodejs.org/en)
3. Have a [Twilio account](https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number) with a valid phone number

## Set Up

1. Fork this repository and clone your fork to your local computer
2. `cd` into this repository through your terminal
3. In the terminal, run `npm install twilio express-session` -- this is going to be the basis of our edits today
4. Open `app.js`
5. Add the appropriate requirements: 

`var session = require('express-session');` after the imports 

`app.use(session({ secret: 'twilio rocks', resave: false, saveUninitialized: false}));` after app is defined. _Note: you wouldn't use a secret like 'twilio rocks' in production, this is only for workshop purposes_

6. Run `npm start` in your terminal to verify that nothing throws an exception
7. Go to `routes/index.js`
8. Follow the notes made on that page to complete the workshop, starting with the `INTRO SECTION` on line 15.

## Running the Game

1. Make sure you're running your local server by using `npm start`
2. Open another tab in terminal and run `twilio login` and log in with the credentials found in your [Twilio console](https://www.twilio.com/console)
3. Run `twilio phone-numbers:update "+yournumber" --sms-url="http://localhost:3000/play-game"` where `yournumber` is instead a 11-digit phone number, i.e. +18005551234
