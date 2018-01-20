import { durationHourMinSecondFormat, durationHumanized, statusCalculation } from './timer';
import * as moment from 'moment';
import { UITimer, enumTimerStatus, TimerChangeNotification } from 'models';

describe('Misc:', () => {

    describe('Misc: durationHourMinSecondFormat', () => {

        it('should pad left second', () => {
            const duration1 = moment.duration(8, 'second');
            const duration2 = moment.duration(15, 'second');

            const duration1Formatted = durationHourMinSecondFormat(duration1);
            const duration2Formatted = durationHourMinSecondFormat(duration2);

            expect(duration1Formatted).toEqual('0:00:08', 'duration1');
            expect(duration2Formatted).toEqual('0:00:15', 'duration2');
        });

        it('should pad left minutes', () => {
            const duration1 = moment.duration(8, 'minute');
            const duration2 = moment.duration(15, 'minute');

            const duration1Formatted = durationHourMinSecondFormat(duration1);
            const duration2Formatted = durationHourMinSecondFormat(duration2);

            expect(duration1Formatted).toEqual('0:08:00', 'duration1');
            expect(duration2Formatted).toEqual('0:15:00', 'duration2');
        });
        it('should not pad left hours', () => {
            const duration1 = moment.duration(8, 'hour');
            const duration2 = moment.duration(15, 'hour');

            const duration1Formatted = durationHourMinSecondFormat(duration1);
            const duration2Formatted = durationHourMinSecondFormat(duration2);

            expect(duration1Formatted).toEqual('8:00:00', 'duration1');
            expect(duration2Formatted).toEqual('5:00:00', 'duration2');
        });
    });

    describe('duration humanized', () => {
        it('should humanize the duration ', () => {
            const duration = moment.duration(53456, 'second');

            const durationHumanizedResult = durationHumanized(duration);

            expect(durationHumanizedResult).toEqual('14 hour(s) and 50 min(s).');
        });
    });

    describe('statusCalculation from model', () => {
        const timerBase: UITimer = {
            durationHumanized: '',
            durationLeft: moment.duration(53456, 'second'),
            percentageDone: 10,
            durationLeftString: '10',
            weekDaysHumanized: [],
            guid: 'guid',
            icon: 'icon',
            title: 'title',
            status: enumTimerStatus.READY,
            ready: null,
            hold: null,
            running: null,
            alert: null,
            over: null,
            done: null,
        };

        it('should convert READY timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: enumTimerStatus.READY }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: true,
                hold: false,
                running: false,
                over: false,
                done: false
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });
        it('should convert HOLD timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: enumTimerStatus.HOLD }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: false,
                hold: true,
                running: false,
                over: false,
                done: false
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });

        it('should convert RUNNING timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: enumTimerStatus.RUNNING }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: false,
                hold: false,
                running: true,
                over: false,
                done: false
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });


        it('should convert OVER_1ST_TIME timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: enumTimerStatus.OVER_1ST_TIME }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: false,
                hold: false,
                running: false,
                over: true,
                done: false
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });


        it('should convert OVER timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: enumTimerStatus.OVER }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: false,
                hold: false,
                running: false,
                over: true,
                done: false
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });

        it('should convert ACKNOWLEDGE timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: enumTimerStatus.ACKNOWLEDGE }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: false,
                hold: false,
                running: false,
                over: false,
                done: true
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });

        it('should convert Defaut timer', () => {
            const timerReady: UITimer = (<UITimer>(<any>{ ...timerBase, status: 999 }));
            const timerReady2: UITimer = {
                ...timerReady,
                ready: false,
                hold: false,
                running: false,
                over: false,
                done: true
            };

            statusCalculation(timerReady);

            expect(timerReady).toEqual(timerReady2);

        });
    });
});
