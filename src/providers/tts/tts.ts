import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Injectable } from '@angular/core';
import * as constant from 'app/constant';
import { IVoiceMessage } from 'models';
import { EventsBroadcasterProvider } from 'providers';

@Injectable()
export class TtsProvider {

    constructor(private tts: TextToSpeech, private events: EventsBroadcasterProvider) {
        this.events.subscribe(constant.EVENT_TTS_SAY, this.textToSpeech);
    }

    textToSpeech = (voiceMessage: IVoiceMessage) => {

      const messageToSay = {...voiceMessage, locale: 'en-us', rate: 0.9 };

        this.tts.speak(messageToSay)
            .then(() => {
              console.log('[tts:textToSpeech] success:', voiceMessage.text, voiceMessage.locale);
            })
            .catch((reason: any) => console.error('[tts:textToSpeech] failed:', reason, voiceMessage.text, voiceMessage.locale));
    }
}
