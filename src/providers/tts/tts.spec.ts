import { TtsProvider } from './tts';
import { EventsMock, TextToSpeechMock, ITTSOptions } from '../../../test-config/mocks-ionic';
import * as constants from '../../app/constant';
import { IVoiceMessage } from '../../models';
import { splitTypescriptSuffix } from '@angular/compiler/src/aot/util';
import { EventsBroadcasterProvider } from '../events-broadcaster/events-broadcaster';


const events = new EventsBroadcasterProvider ();
const ttsNative = new TextToSpeechMock();
const tts = new TtsProvider(ttsNative, events);

describe('TTS:', () => {

    it('should says something', () => {
        // const voiceMessage: IVoiceMessage = {
        //     locale: 'far-far',
        //     text: 'text'
        // };

        // spyOn(tts, 'textToSpeech');
        // // spyOn(events, 'publish').and.
        // events.publish(constants.EVENT_TTS_SAY, voiceMessage);

        // expect(tts.textToSpeech).toHaveBeenCalledWith('toto');
    });
});