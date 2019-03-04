'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.$speech.addText(`Welcome to Smart Lock. Would you like to check the status of your lock, lock a door, or unlock a door?`);
        this.$reprompt.addText(`Do you want to lock, unlock, or check the status of one of your locks?`);

        this.ask(this.$speech, this.$reprompt);
    },

    LockIntent() {
        let lockStatus = this.$inputs.lockStatus.value;
        if(lockStatus === 'unlock') {
            this.$speech.addText('Your door has been successfully unlocked.');
        } else {
            this.$speech.addText('Your door has been successfully locked.');
        }
        this.tell(this.$speech);
    },

    MyNameIsIntent() {
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
