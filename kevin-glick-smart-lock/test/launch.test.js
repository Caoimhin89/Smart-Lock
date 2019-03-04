'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return a welcome message and ask for door instructions at "LAUNCH"', async () => {
            const conversation = testSuite.conversation();

            const launchRequest = await testSuite.requestBuilder.launch();
            const responseLaunchRequest = await conversation.send(launchRequest);
            expect(
                responseLaunchRequest.isAsk(expectedLaunchPrompt, expectedLaunchReprompt)
            ).toBe(true);

        });
    });
}

let expectedLaunchPrompt = `Welcome to Smart Lock. Would you like to check the status of your lock, lock a door, or unlock a door?`;
let expectedLaunchReprompt = `Do you want to lock, unlock, or check the status of one of your locks?`;

