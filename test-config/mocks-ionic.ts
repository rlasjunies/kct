import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as angularCore from '@angular/core';
export class NativeAudioMock {
    preloadSimple(id: string, assetPath: string): Promise<any> {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }
}

export class BackgroundModeMock {
    // setDefaults(options?: BackgroundModeConfiguration): Promise<any>{
    setDefaults(options?: any): Promise<any> {
        return new Promise(function (resolve: Function): void {
            resolve();
        });

    }
}

export interface ITTSOptions {
    /** text to speak */
    text: string;
    /** a string like 'en-US', 'zh-CN', etc */
    locale?: string;
    /** speed rate, 0 ~ 1 */
    rate?: number;
}
export class TextToSpeechMock {

    speak(textOrOption: string | ITTSOptions): Promise<null> {
        return new Promise( (resolve) => {
            resolve(null);
        } );
    }

    stop(): Promise<null> {
        return new Promise( (resolve) => {
            resolve(null);
        } );
    }





}

export class PlatformMock {
    public ready(): Promise<String> {
        return new Promise((resolve) => {
            resolve('READY');
        });
    }

    public getQueryParam() {
        return true;
    }

    public registerBackButtonAction(fn: Function, priority?: number): Function {
        return (() => true);
    }

    public hasFocus(ele: HTMLElement): boolean {
        return true;
    }

    public doc(): HTMLDocument {
        return document;
    }

    public is(): boolean {
        return true;
    }

    public getElementComputedStyle(container: any): any {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    }

    public onResize(callback: any) {
        return callback;
    }

    public registerListener(ele: any, eventName: string, callback: any): Function {
        return (() => true);
    }

    public win(): Window {
        return window;
    }

    public raf(callback: any): number {
        return 1;
    }

    public timeout(callback: any, timer: number): any {
        return setTimeout(callback, timer);
    }

    public cancelTimeout(id: any) {
        // do nothing
    }

    public getActiveElement(): any {
        return document['activeElement'];
    }

    // tslint:disable-next-line:member-ordering
    public pause: angularCore.EventEmitter<Event> = new angularCore.EventEmitter();
    // tslint:disable-next-line:member-ordering
    public resume: angularCore.EventEmitter<Event> = new angularCore.EventEmitter();
    // resume: EventEmitter<Event>;
}

export class StatusBarMock extends StatusBar {
    hide(): void { }
    styleDefault() {
        return;
    }
}

export class SplashScreenMock extends SplashScreen {
    hide() {
        return;
    }
}

export class FormMock {
    public register(): any {
        return true;
    }
}


export class NavMock {

    public pop(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public push(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public getActive(): any {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }

    public registerChildNav(nav: any): void {
        return;
    }

}
export class AppMock {

    public getRootNav(): any {
        return new NavMock();
    }

}
export class NavParamsMock {

    public returnParams: any = {};

    public get(key): any {
        if (this.returnParams[key]) {
            return this.returnParams[key];
        }
    }

    public setParams(key, value): any {
        this.returnParams[key] = value;
    }

}

export class ViewControllerMock {

    public readReady: any = {
        emit(): void {

        },
        subscribe(): any {

        }
    };

    public writeReady: any = {
        emit(): void {

        },
        subscribe(): any {

        }
    };

    public contentRef(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public didEnter(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public didLeave(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public onDidDismiss(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public onWillDismiss(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public willEnter(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public willLeave(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public willUnload(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public dismiss(): any {
        return true;
    }

    public enableBack(): any {
        return true;
    }

    public getContent(): any {
        return true;
    }

    public hasNavbar(): any {
        return true;
    }

    public index(): any {
        return true;
    }

    public isFirst(): any {
        return true;
    }

    public isLast(): any {
        return true;
    }

    public pageRef(): any {
        return true;
    }

    public setBackButtonText(): any {
        return true;
    }

    public showBackButton(): any {
        return true;
    }

    public _setHeader(): any {
        return true;
    }

    public _setIONContent(): any {
        return true;
    }

    public _setIONContentRef(): any {
        return true;
    }

    public _setNavbar(): any {
        return true;
    }

    public _setContent(): any {
        return true;
    }

    public _setContentRef(): any {
        return true;
    }

    public _setFooter(): any {
        return true;
    }

}

export class LoadingComponentMock {
    present(): any { return Promise.resolve(true); }
    dismiss(): any { return Promise.resolve(true); }
}

export class LoadingControllerMock {
    public create(): LoadingComponentMock {
        return new LoadingComponentMock();
    }
}

export class AlertComponentMock {
    present(): void { }
    dismiss(): void { }
}

export class AlertControllerMock {
    public create(): AlertComponentMock {
        return new AlertComponentMock();
    }
}

export class MenuMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

class ModalComponentMock {
    present(): void { }
    dismiss(): void { }
}

export class ModalControllerMock {
    public create(page): ModalComponentMock {
        return new ModalComponentMock();
    }
}

export class DeepLinkerMock {

}

export class EventsMock {
    private _channels;
    subscribe(topic: string, ...handlers: Function[]): void { }
    unsubscribe(topic: string, handler?: Function): boolean {
        return true;
    }
    publish(topic: string, ...args: any[]): any[] {
        return [];
    }
}