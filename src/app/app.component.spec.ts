import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MyApp } from './app.component';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../test-config/mocks-ionic';
import { TimerService, TimerSoundProvider, SmartAudioProvider, TimerNotificationProvider, TimerConfigService } from 'providers';

describe('Root Component', () => {

  // let de: DebugElement;
  let comp: MyApp;
  let fixture: ComponentFixture<MyApp>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        TimerConfigService,
        TimerService,
        TimerNotificationProvider,
        TimerSoundProvider,
        SmartAudioProvider,
        NativeAudio,
        LocalNotifications,
        BackgroundMode
      ]
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp instanceof MyApp).toBe(true);
  });

  it('should create component #2', () => {
    expect(comp instanceof MyApp).toBe(true);
  });

});