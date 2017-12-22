import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TimerProvider } from './timer-service';

describe('timer provider', () => {

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
        timers = new TimerProvider();
    });

    it('service should be created', () => {
        expect(timers).toBeDefined();
    });

});