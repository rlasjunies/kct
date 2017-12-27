import { async, TestBed, inject } from '@angular/core/testing';

import { TimerProvider } from './timer-service';
import { StorageLocalProvider } from 'providers/storage-local/storage-local';
import { StorageInMemoryProvider } from 'providers/storage-in-memory/storage-in-memory';
import { TimerStorageProvider } from 'providers';
import { } from 'jasmine';
describe('timer provider', () => {

    // const storage = new TimerStorageMock();
    let timerService: TimerProvider;

    // let comp: MyApp;
    // let fixture: ComponentFixture<MyApp>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [
            ],
            providers: [
                TimerProvider,
                TimerStorageProvider,
                { provide: StorageLocalProvider, useClass: StorageInMemoryProvider }
            ]
        });

    }));

    beforeEach(
        inject([TimerProvider], (timerProvider: TimerProvider) => {
            timerService = timerProvider;
        }));

    it('service should be created', () => {
        expect(timerService).toBeDefined();
    });

    describe('isThereAtLeastOneTimerRunning', () => {
        it('should return no when no timer are runnung', () => {
            (<StorageInMemoryProvider>(<any>timerService.timerStorage).storage)._data = {
                'kct_timers': {
                    'dayOfLastTimersCalculation': '2017-12-27',
                    'timersConfig': [
                        {
                            'guid': '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3',
                            'weekdays': 255,
                            'title': '####1',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:30',
                            'icon': 'game-controller-b',
                            'enable': true
                        },
                        {
                            'guid': 'a99897da-1460-409b-9778-571a3c4756ae',
                            'weekdays': 255,
                            'title': '####2',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:00',
                            'icon': 'film',
                            'enable': true
                        },
                        {
                            'guid': '17913ab4-b7b2-4aba-af9f-01e6019844b3',
                            'weekdays': 255,
                            'title': '####3',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:30',
                            'icon': 'game-controller-b',
                            'enable': true
                        }
                    ]
                },
                'kct_569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3': {
                    'guid': '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3',
                    'title': 'Paul - game',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                },
                'kct_a99897da-1460-409b-9778-571a3c4756ae': {
                    'guid': 'a99897da-1460-409b-9778-571a3c4756ae',
                    'title': 'Paul - TV',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                },
                'kct_17913ab4-b7b2-4aba-af9f-01e6019844b3': {
                    'guid': '17913ab4-b7b2-4aba-af9f-01e6019844b3',
                    'title': 'Louis - game',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                }
            };

            //
            const isThereAtleastOneTimerRunning = timerService.isThereAtLeastOneTimerRunning();

            //
            expect(isThereAtleastOneTimerRunning).toBeFalsy();
        });

        it('should return yes when one timer is started', () => {
            (<StorageInMemoryProvider>(<any>timerService.timerStorage).storage)._data = {
                'kct_timers': {
                    'dayOfLastTimersCalculation': '2017-12-27',
                    'timersConfig': [
                        {
                            'guid': '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3',
                            'weekdays': 255,
                            'title': '####1',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:30',
                            'icon': 'game-controller-b',
                            'enable': true
                        },
                        {
                            'guid': 'a99897da-1460-409b-9778-571a3c4756ae',
                            'weekdays': 255,
                            'title': '####2',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:00',
                            'icon': 'film',
                            'enable': true
                        },
                        {
                            'guid': '17913ab4-b7b2-4aba-af9f-01e6019844b3',
                            'weekdays': 255,
                            'title': '####3',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:30',
                            'icon': 'game-controller-b',
                            'enable': true
                        }
                    ]
                },
                'kct_569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3': {
                    'guid': '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3',
                    'title': 'Paul - game',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 60
                },
                'kct_a99897da-1460-409b-9778-571a3c4756ae': {
                    'guid': 'a99897da-1460-409b-9778-571a3c4756ae',
                    'title': 'Paul - TV',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                },
                'kct_17913ab4-b7b2-4aba-af9f-01e6019844b3': {
                    'guid': '17913ab4-b7b2-4aba-af9f-01e6019844b3',
                    'title': 'Louis - game',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                }
            };

            //
            const isThereAtleastOneTimerRunning = timerService.isThereAtLeastOneTimerRunning();

            //
            expect(isThereAtleastOneTimerRunning).toBeTruthy();

        });

        it('should return yes when 1 timer is running', () => {
            (<StorageInMemoryProvider>(<any>timerService.timerStorage).storage)._data = {
                'kct_timers': {
                    'dayOfLastTimersCalculation': '2017-12-27',
                    'timersConfig': [
                        {
                            'guid': '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3',
                            'weekdays': 255,
                            'title': '####1',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:30',
                            'icon': 'game-controller-b',
                            'enable': true
                        },
                        {
                            'guid': 'a99897da-1460-409b-9778-571a3c4756ae',
                            'weekdays': 255,
                            'title': '####2',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:00',
                            'icon': 'film',
                            'enable': true
                        },
                        {
                            'guid': '17913ab4-b7b2-4aba-af9f-01e6019844b3',
                            'weekdays': 255,
                            'title': '####3',
                            'durationMilliSecond': 5000,
                            'durationHumanized': '01:30',
                            'icon': 'game-controller-b',
                            'enable': true
                        }
                    ]
                },
                'kct_569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3': {
                    'guid': '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3',
                    'title': 'Paul - game',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 30
                },
                'kct_a99897da-1460-409b-9778-571a3c4756ae': {
                    'guid': 'a99897da-1460-409b-9778-571a3c4756ae',
                    'title': 'Paul - TV',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                },
                'kct_17913ab4-b7b2-4aba-af9f-01e6019844b3': {
                    'guid': '17913ab4-b7b2-4aba-af9f-01e6019844b3',
                    'title': 'Louis - game',
                    'durationLeft_MilliSecond': 5000,
                    'duration': 5000,
                    'status': 10
                }
            };

            //
            const isThereAtleastOneTimerRunning = timerService.isThereAtLeastOneTimerRunning();

            //
            expect(isThereAtleastOneTimerRunning).toBeTruthy();

        });
    });
});