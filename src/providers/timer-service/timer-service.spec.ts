import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TimerProvider } from './timer-service';
import { TimerStorageMock } from '../timer-storage/timer-storage.mock';

describe('timer provider', () => {

    const storage = new TimerStorageMock();
    let timers: TimerProvider;

    // let comp: MyApp;
    // let fixture: ComponentFixture<MyApp>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [
            ],
            providers: [
            ]
        });

    }));

    beforeEach(() => {
        timers = new TimerProvider(storage);
    });

    it('service should be created', () => {
        expect(timers).toBeDefined();
    });

    describe('isThereAtLeastOneTimerRunning', () => {
        it('should return no when no timer are runnung', () => {
            //
            //
            const isThereAtleastOneTimerRunning = timers.isThereAtLeastOneTimerRunning();
            //
            expect(isThereAtleastOneTimerRunning).toBeFalsy();
        });

        it('should return yes when one timer is running', () => {
            const isThereAtleastOneTimerRunning = timers.isThereAtLeastOneTimerRunning();
            //
            expect(isThereAtleastOneTimerRunning).toBeFalsy();

        });

        it('should return yes when 3 timers are running', () => {
            const isThereAtleastOneTimerRunning = timers.isThereAtLeastOneTimerRunning();
            //
            expect(isThereAtleastOneTimerRunning).toBeFalsy();
        });
    });
});