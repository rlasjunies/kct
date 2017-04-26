// import { describe, beforeEach, addProviders, inject, expect, it} from '@angular/core/testing';

// import * as mock from '../../misc/mocks';
// import { Events } from 'ionic-angular';
// import { TimerConfigService } from './timer-config-service';

// let defaultTimer1 = { guid: '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3', weekdays: 62, title: 'Paul - game', durationMilliSecond: 5400000, durationHumanized: '01:30', picture: 'build/assets/images/rlas.png', enable: true };
// let defaultTimer3 = { guid: '17913ab4-b7b2-4aba-af9f-01e6019844b3', weekdays: 254, title: 'Louis - game', durationMilliSecond: 5400000, durationHumanized: '01:30', picture: 'build/assets/images/rlas.png', enable: true };
// let defaultTimer5 = { guid: '4d555d07-341c-40aa-aabe-9799577ba2a6', weekdays: 6, title: 'Richard - TV', durationMilliSecond: 3600000, durationHumanized: '01:00', picture: '', enable: false };

// let defaultTimersConfig = [
//     defaultTimer1,
//     { guid: 'a99897da-1460-409b-9778-571a3c4756ae', weekdays: 192, title: 'Paul - TV', durationMilliSecond: 3600000, durationHumanized: '01:00', picture: 'build/assets/images/rlas.png', enable: true },
//     defaultTimer3,
//     defaultTimer5,
//     { guid: 'ef8d4703-d939-4b75-a814-0157cb8ac0b5', weekdays: 126, title: 'Louis - TV', durationMilliSecond: 3600000, durationHumanized: '01:00', picture: 'build/assets/images/rlas.png', enable: true },
//     { guid: '4d555d07-341c-40aa-aabe-9799577bz2a6', weekdays: 254, title: 'tests1', durationMilliSecond: 3000, durationHumanized: '00:03', picture: '', enable: true },
//     { guid: '4d555d07-341c-40aa-aabe-9799577be2a6', weekdays: 254, title: 'tests2', durationMilliSecond: 3000, durationHumanized: '00:03', picture: '', enable: true },
//     { guid: '4d555d07-341c-40aa-aabe-9799577br2a6', weekdays: 254, title: 'tests3', durationMilliSecond: 3000, durationHumanized: '00:03', picture: '', enable: true },
// ];
// let defaultConfig = {
//     dayOfLastTimersCalculation: '2016-08-10',
//     timersConfig: defaultTimersConfig
// };

// let newTimerConfig = {
//     // guid: misc.GUID_new(),
//     title: '',
//     durationMilliSecond: 5400000,
//     durationHumanized: '',
//     picture: '',
//     weekdays: 192,
//     enable: true
// };

// // one instance of storage for all tests
// let storage4Tests = new mock.StorageMock();

// class EventsMock {
//     constructor() { }
//     publish(msg: string, value: any) {

//     }
// }

// describe('TimerConfigService =>', () => {
//     beforeEach(() => {
//         addProviders([
//             {
//                 provide: Storage, useFactory: () => {
//                     // console.log('Dans factory');
//                     return storage4Tests;
//                 },
//             },
//             // KO { provide: Storage, useExisting: storage4Tests },
//             // OK { provide: Storage, useClass: mock.StorageMock },
//             { provide: TimerConfigService, useClass: TimerConfigService },
//             { provide: Events, useClass: EventsMock }
//         ]);
//     });

//     it('check getTimersConfig', inject([TimerConfigService], (service: TimerConfigService) => {
//         // console.log("**********", JSON.stringify(defaultTimersConfig),"**************");
//         // console.log("----------", JSON.stringify(service.getAll()),"-----------------");
//         expect(service.getAll()).toEqual(defaultTimersConfig);
//     }));

//     it('check getTimerConfig', inject([TimerConfigService], (service: TimerConfigService) => {
//         expect(service.get('569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3')).toEqual(defaultTimer1);
//         expect(service.get('17913ab4-b7b2-4aba-af9f-01e6019844b3')).toEqual(defaultTimer3);
//         expect(service.get('4d555d07-341c-40aa-aabe-9799577ba2a6')).toEqual(defaultTimer5);
//     }));

//     it('check newTimerConfig', inject([TimerConfigService], (service: TimerConfigService) => {
//         let tmp = service.new_();
//         delete tmp.guid;
//         expect(tmp).toEqual(newTimerConfig);
//     }));
// });