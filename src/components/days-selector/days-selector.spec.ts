import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
// import { MyApp } from 'app/app.component';

import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PlatformMock, StatusBarMock, SplashScreenMock, NativeAudioMock, BackgroundModeMock } from 'mock/mocks-ionic';
import * as providers from 'providers';
import { StorageLocalProvider, StorageInMemoryProvider } from 'providers';

import { DaysSelectorComponent } from "./days-selector";

describe('Days selector component', () => {

    let deInputMonday: DebugElement;
    let elInputMonday: HTMLInputElement;
    let deLabelMonday: DebugElement;
    let elLabelMonday: HTMLLabelElement;
    
    let deInputTuesday: DebugElement;
    let elInputTuesday: HTMLInputElement;
    let deLabelTuesday: DebugElement;
    let elLabelTuesday: HTMLLabelElement;
    
    let deInputWednesday: DebugElement;
    let elInputWednesday: HTMLInputElement;
    let deLabelWednesday: DebugElement;
    let elLabelWednesday: HTMLLabelElement;
    
    let deInputThursday: DebugElement;
    let elInputThursday: HTMLInputElement;
    let deLabelThursday: DebugElement;
    let elLabelThursday: HTMLLabelElement;
    
    let deInputFriday: DebugElement;
    let elInputFriday: HTMLInputElement;
    let deLabelFriday: DebugElement;
    let elLabelFriday: HTMLLabelElement;
    
    let deInputSaturday: DebugElement;
    let elInputSaturday: HTMLInputElement;
    let deLabelSaturday: DebugElement;
    let elLabelSaturday: HTMLLabelElement;
    
    let deInputSunday: DebugElement;
    let elInputSunday: HTMLInputElement;
    let deLabelSunday: DebugElement;
    let elLabelSunday: HTMLLabelElement;



    let comp: DaysSelectorComponent;
    let fixture: ComponentFixture<DaysSelectorComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [DaysSelectorComponent],
            imports: [
                IonicModule.forRoot(DaysSelectorComponent)
            ],
            providers: [
                providers.DaysEncodingProvider
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaysSelectorComponent);
        comp = fixture.componentInstance;

        deInputMonday = fixture.debugElement.query(By.css('#day1'));
        elInputMonday = deInputMonday.nativeElement;

        deLabelMonday = fixture.debugElement.query(By.css('label[for="day1"'));
        elLabelMonday = deLabelMonday.nativeElement;



        deInputTuesday = fixture.debugElement.query(By.css('#day2'));
        elInputTuesday = deInputTuesday.nativeElement;

        deLabelTuesday = fixture.debugElement.query(By.css('label[for="day2"'));
        elLabelTuesday = deLabelTuesday.nativeElement;


        deInputWednesday = fixture.debugElement.query(By.css('#day3'));
        elInputWednesday = deInputWednesday.nativeElement;

        deLabelWednesday = fixture.debugElement.query(By.css('label[for="day3"'));
        elLabelWednesday = deLabelWednesday.nativeElement;

        deInputThursday = fixture.debugElement.query(By.css('#day4'));
        elInputThursday = deInputThursday.nativeElement;

        deLabelThursday = fixture.debugElement.query(By.css('label[for="day4"'));
        elLabelThursday = deLabelThursday.nativeElement;




        deInputFriday = fixture.debugElement.query(By.css('#day5'));
        elInputFriday = deInputFriday.nativeElement;

        deLabelFriday = fixture.debugElement.query(By.css('label[for="day5"'));
        elLabelFriday = deLabelFriday.nativeElement;




        deInputSaturday = fixture.debugElement.query(By.css('#day6'));
        elInputSaturday = deInputSaturday.nativeElement;

        deLabelSaturday = fixture.debugElement.query(By.css('label[for="day6"'));
        elLabelSaturday = deLabelSaturday.nativeElement;



        deInputSunday = fixture.debugElement.query(By.css('#day7'));
        elInputSunday = deInputSunday.nativeElement;

        deLabelSunday = fixture.debugElement.query(By.css('label[for="day7"'));
        elLabelSunday = deLabelSunday.nativeElement;





    });

    it('should create component', () => {
        expect(comp instanceof DaysSelectorComponent).toBe(true);
    });

    it('should initiate with value 0', () => {
        // 
        // 
        expect(comp._days).toEqual(0);
    });

    it('should change day1 when setting days = 1', () => {
        // 
        const before = comp.day1;
        comp.days = 1;
        const after = comp.day1
        // 
        expect(before).not.toEqual(after);
    });

    it('should initiate the 1st label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelMonday.textContent;

        expect(dayText).toContain('Mon');
    });

    it('should initiate the 1st label unchecked', () => {
        fixture.detectChanges();

        //
        const selectMonday = elInputMonday.checked;

        expect(selectMonday).toBeFalsy();
    });

    it('should check monday on click', () => {
        deInputMonday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const selectMonday = elInputMonday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(1,"monday selected should be 1");
        expect(selectMonday).toBeTruthy('Monday should be selected');
    })




    it('should initiate the 2nd label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelTuesday.textContent;

        expect(dayText).toContain('Tue');
    });

    it('should initiate the 1st label unchecked', () => {
        fixture.detectChanges();

        //
        const selectTuesday = elInputTuesday.checked;

        expect(selectTuesday).toBeFalsy();
    });

    it('should check tuesday on click', () => {
        deInputTuesday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const selectTuesday = elInputTuesday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(2,"tuesday selected should be 2");
        expect(selectTuesday).toBeTruthy('Tuesday should be selected');
    })





    it('should initiate the 3rd label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelFriday.textContent;

        expect(dayText).toContain('Fri');
    });

    it('should initiate the 3rd label unchecked', () => {
        fixture.detectChanges();

        //
        const select = elInputFriday.checked;

        expect(select).toBeFalsy();
    });

    it('should check friday on click', () => {
        deInputWednesday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const select= elInputWednesday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(4,"Wednesday selected should be 4");
        expect(select).toBeTruthy('Wednesday should be selected');
    })








    it('should initiate the 4th label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelThursday.textContent;

        expect(dayText).toContain('Thu');
    });

    it('should initiate the 4th label unchecked', () => {
        fixture.detectChanges();

        //
        const select = elInputThursday.checked;

        expect(select).toBeFalsy();
    });

    it('should check thursday on click', () => {
        deInputThursday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const select= elInputThursday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(8,"Thursday selected should be 8");
        expect(select).toBeTruthy('Thursday should be selected');
    })







    it('should initiate the 5th label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelFriday.textContent;

        expect(dayText).toContain('Fri');
    });

    it('should initiate the 5th label unchecked', () => {
        fixture.detectChanges();

        //
        const select = elInputFriday.checked;

        expect(select).toBeFalsy();
    });

    it('should check friday on click', () => {
        deInputFriday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const select= elInputFriday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(16,"Friday selected should be 16");
        expect(select).toBeTruthy('Friday should be selected');
    })








    it('should initiate the 6th label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelSaturday.textContent;

        expect(dayText).toContain('Sat');
    });

    it('should initiate the 6th label unchecked', () => {
        fixture.detectChanges();

        //
        const select = elInputSaturday.checked;

        expect(select).toBeFalsy();
    });

    it('should check saturday on click', () => {
        deInputSaturday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const select= elInputSaturday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(32,"Saturday selected should be 32");
        expect(select).toBeTruthy('Saturday should be selected');
    })




    



    it('should initiate the 7th label', () => {
        fixture.detectChanges();
        //
        const dayText = elLabelSunday.textContent;

        expect(dayText).toContain('Sun');
    });

    it('should initiate the 7th label unchecked', () => {
        fixture.detectChanges();

        //
        const select = elInputSunday.checked;

        expect(select).toBeFalsy();
    });

    it('should check sunday on click', () => {
        deInputSunday.triggerEventHandler("change",null);

        fixture.detectChanges();

        //
        const select= elInputSunday.checked;
        const daysNumber = comp._days;

        expect(daysNumber).toEqual(64,"Sunday selected should be 64");
        expect(select).toBeTruthy('Sunday should be selected');
    })




    

});