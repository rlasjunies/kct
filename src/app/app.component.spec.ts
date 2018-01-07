import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { App } from './app.component';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PlatformMock, StatusBarMock, SplashScreenMock, NativeAudioMock, BackgroundModeMock } from '../../test-config/mocks-ionic';
import * as providers from 'providers';
import { StorageLocalProvider, StorageInMemoryProvider } from 'providers';

describe('Root Component', () => {

  // let de: DebugElement;
  let comp: App;
  let fixture: ComponentFixture<App>;

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
        { provide: NativeAudio, useClass: NativeAudioMock},
        { provide: BackgroundMode, useClass: BackgroundModeMock },
        { provide: StorageLocalProvider, useClass: StorageInMemoryProvider},
        providers.TimerProvider,
        providers.TimerStorageProvider,
        providers.TimerSoundProvider,
        providers.SmartAudioProvider,
        providers.BackgroundModeProvider,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp instanceof App).toBe(true);
  });

  it('should create component #2', () => {
    expect(comp instanceof App).toBe(true);
  });

});