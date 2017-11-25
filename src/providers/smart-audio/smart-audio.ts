import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Platform } from 'ionic-angular';

@Injectable()
export class SmartAudioProvider {

    audioType = 'html5';
    sounds: any = [];

    htmlAudioElement: HTMLAudioElement;
    constructor(
        public nativeAudio: NativeAudio,
        platform: Platform,
    ) {

        if (platform.is('cordova')) {
            this.audioType = 'native';
        }
    }

    preload(key, asset) {

        if (this.audioType === 'html5') {

            const audio = {
                key: key,
                asset: asset,
                type: 'html5',
                audioAsset: new Audio(asset)
            };

            this.sounds.push(audio);

        } else {

            this.nativeAudio.preloadSimple(key, asset);

            const audio = {
                key: key,
                asset: key,
                type: 'native'
            };

            this.sounds.push(audio);
        }

    }

    play(key) {
        const audio = this.sounds.find((sound) => {
            return sound.key === key;
        });

        if (audio.type === 'html5') {
            // let audioAsset = new Audio(audio.asset);
            // audioAsset.play();
            audio.audioAsset.play();
        } else {
            this.nativeAudio.play(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        }
    }
    stop(key) {
        const audio = this.sounds.find((sound) => {
            return sound.key === key;
        });

        if (audio.type === 'html5') {
            // let audioAsset = new Audio(audio.asset);
            audio.audioAsset.pause();
        } else {
            this.nativeAudio.stop(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        }
    }
}
