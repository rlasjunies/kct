import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { App } from './app.component';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Events } from 'ionic-angular';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

import { NativeAudioMock, BackgroundModeMock, NavMock } from '../../test-config/mocks-ionic';
import { PlatformMock, StatusBarMock, SplashScreenMock, EventsMock } from '../../test-config/mocks-ionic';
// import { PlatformMock, StatusBarMock, SplashScreenMock, EventsMock } from 'ionic-mocks';
import * as providers from 'providers';
import { StorageLocalProvider, StorageInMemoryProvider } from 'providers';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { setTimeout } from 'core-js/library/web/timers';
// import { waits } from 'jasmine-core';

import * as jasmine from 'jasmine-core';
import { Nav } from 'ionic-angular/components/nav/nav';
import { By } from '@angular/platform-browser';

describe('Root Component', () => {

    let comp: App;
    let fixture: ComponentFixture<App>;
    let de: DebugElement;
    let des: DebugElement[];
    let el: HTMLElement;

    let events: EventsMock;
    let platform: PlatformMock;

    beforeEach(async(() => {


        TestBed.configureTestingModule({
            declarations: [App],
            imports: [
                IonicModule.forRoot(App)
            ],
            providers: [
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: NativeAudio, useClass: NativeAudioMock },
                { provide: BackgroundMode, useClass: BackgroundModeMock },
                { provide: StorageLocalProvider, useClass: StorageInMemoryProvider },
                { provide: Events, useClass: EventsMock },
                providers.TimerProvider,
                providers.TimerStorageProvider,
                providers.TimerSoundProvider,
                providers.SmartAudioProvider,
                providers.BackgroundModeProvider,
            ]
        });
    }));

    beforeEach(inject([Events, Platform], (eventsInject: EventsMock, platformInject: PlatformMock) => {
        fixture = TestBed.createComponent(App);
        comp = fixture.componentInstance;


        events = eventsInject;
        platform = platformInject;

    }));

    it('should create app component', () => {
        expect(comp instanceof App).toBe(true);
    });

    it('should emit event on device ready', (done) => {

        spyOn(comp.events, 'publish').and.callThrough();
        // spyOn(events, 'publish');
        // comp.platformNative.pause.emit(new Event('test'));
        setTimeout(() => {
            expect(comp.events.publish).toHaveBeenCalledWith('app:ready');
            done();
        }, 500);

    });

    it('should emit event on pause', (done) => {

        spyOn(comp.events, 'publish');
        setTimeout(() => {
            expect(comp.events.publish).toHaveBeenCalledWith('app:ready');
        }, 50);
        setTimeout(() => {
            comp.platformNative.pause.emit(new Event('test'));
        }, 100);
        setTimeout(() => {
            expect(comp.events.publish).toHaveBeenCalledWith('app:pause');
            done();
        }, 150);

    });

    it('should emit event on resume', (done) => {

        spyOn(comp.events, 'publish');
        setTimeout(() => {
            expect(comp.events.publish).toHaveBeenCalledWith('app:ready');
        }, 50);
        setTimeout(() => {
            comp.platformNative.resume.emit(new Event('test'));
        }, 100);
        setTimeout(() => {
            expect(comp.events.publish).toHaveBeenCalledWith('app:resume');
            done();
        }, 150);

    });

    it('should click on about...', fakeAsync(() => {
        // de = fixture.debugElement.query(By.css('ion-list ion-item'));
        // de.triggerEventHandler('click', null);

        // expect(el.textContent).toContain(firstProduct.title);
        // expect(el.textContent).toContain(firstProduct.description);
        // expect(el.textContent).toContain(firstProduct.price);

        // spyOn(comp, 'openSettingPage').apply(() => { });
        // de = fixture.debugElement.query(By.css('ion-list ion-label'));

        // de = fixture.debugElement.queryAll( By.css('button'));
        spyOn(comp, 'isDevMode').and.returnValue(false);

        // spyOn(comp, 'openSettingPage').and.callFake(() => console.log('zzz settings Fake function called'));
        // spyOn(comp, 'openAboutPage').and.callFake(() => console.log('zzz about Fake function called')) ;
        // spyOn(comp, 'openAboutPage').and.callThrough();
        // spyOn(comp, 'openAboutPage').and.callFake(() => { });

        spyOn(comp.nav, 'push');

        fixture.detectChanges();

        // de = fixture.debugElement.query(By.css('ion-list button:nth-child(1)'));

        // retrieve about button
        de = fixture.debugElement.query(By.css('ion-list button:nth-child(2)'));
        // des = fixture.debugElement.queryAll(By.all());
        // des = fixture.debugElement.queryAll(By.css('ion-list button'));
        // de = fixture.debugElement.query(By.all());
        // console.log('0000000000000000000', de);
        // console.log('0000000000000000000', de.nativeNode);
        // console.log('0000000000000000000+++++++++++', des.length);
        de.triggerEventHandler('click', null);

        // el = de.nativeElement;

        // console.log('1111111111111111111', el);

        // expect(el.textContent).toContain('Settings', 'Button should contain "settings"');
        // de.triggerEventHandler('click', null);
        // el.click();
        fixture.detectChanges();

        // expect(comp.openAboutPage).toHaveBeenCalledTimes(1);
        // expect(comp.openSettingPage).toHaveBeenCalledTimes(1);

        expect(comp.nav.push).toHaveBeenCalledWith('about');

    }));
    it('should click on settings ..', fakeAsync(() => {
        spyOn(comp, 'isDevMode').and.returnValue(true);

        spyOn(comp.nav, 'push');

        fixture.detectChanges();

        // retrieve settings button
        de = fixture.debugElement.query(By.css('ion-list button:nth-child(1)'));
        // console.log('0000000000000000000', de.nativeNode);
        // console.log('0000000000000000000+++++++++++', des.length);
        de.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(comp.nav.push).toHaveBeenCalledWith('settings');

    }));
});
