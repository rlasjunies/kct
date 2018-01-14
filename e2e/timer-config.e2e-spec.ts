import * as page from './timer-config.po';
import * as pageTimers from './timers.po';
import { browser, ExpectedConditions, protractor } from 'protractor';
import { isDate } from 'util';
import { beforeEachSleep, navigateSleep, takeScreenShot } from './_helper';
import { minutesSelector$, durationOfTimerText$, modalPageIconSelection, modalPageIconSelection_title, modalPageIconSelection_listIcon, iconButtonIcon$, deleteIcon, deleteAlert, deleteAlert_title, deleteAlert_cancel } from './timer-config.po';

const uid = 'e2e timer config' + Date.now();

describe('Timer config', function () {

    beforeAll(async () => {
        await browser.get(pageTimers.url);
    });

    beforeEach(async () => {
        await browser.sleep(beforeEachSleep);
    });

    afterEach(() => {
        // takeScreenShot();
    });

    describe('initial screen', () => {
        beforeEach(() => {
        });

        it('should have a title ', async () => {
            const title = await browser.getTitle();
            expect(title).toEqual(pageTimers.title);
        });
    });

    describe('create a new timer', () => {
        it('should navigate to "timer-config" clicking on add', async () => {
            await pageTimers.addButton$.click();
            await browser.sleep(navigateSleep);
            const url = await browser.getCurrentUrl();
            expect(url).toContain(pageTimers.navigatedTo_TimerConfig);
        });

        it('should have values initiated', async () => {
            const iconName = await page.iconButtonIcon$.getAttribute('name');
            expect(iconName).toBeNull();

            const timerName = await page.timerName$.getText();
            expect(timerName).toEqual('');

            const hours = await page.hoursSelector$.getAttribute('ng-reflect-hours');
            expect(hours.toString()).toEqual('1', 'hours selector');

            const minutes = await page.minutesSelector$.getAttribute('ng-reflect-minutes');
            expect(minutes.toString()).toEqual('30', 'minutes selector');

            const days = await page.daysSelector$.getAttribute('ng-reflect-days');
            expect(days.toString()).toEqual('96', 'days selector');
        });

        it('should allows modifications - timer name', async () => {

            await page.timerName$.$('input').sendKeys(uid);
            const timerName = await page.timerName$.getAttribute('ng-reflect-value');
            // const timerName = await page.timerName$.getTe
            expect(timerName).toEqual(uid);
        });

        it('should allows modifications - hours', async () => {
            // no success clicking on the element
            await page.hoursSelector_1h$.sendKeys(protractor.Key.LEFT);

            const duration = await page.durationOfTimerText$.getText();

            expect(duration).toEqual('Duration of the timer: 0:30 hour(s)');

        });

        it('should allows modifications - minutes', async () => {
            await page.minutesSelector_30m$.sendKeys(protractor.Key.ARROW_RIGHT);

            const duration = await page.durationOfTimerText$.getText();

            expect(duration).toEqual('Duration of the timer: 0:45 hour(s)');
        });

        it('should allows modifications - days', async () => {
            await page.daysSelector_mon$.sendKeys(protractor.Key.SPACE);
            await page.daysSelector_tue$.sendKeys(protractor.Key.SPACE);
            await page.daysSelector_wed$.sendKeys(protractor.Key.SPACE);

            const days = await page.daysSelector$.getAttribute('ng-reflect-days');
            expect(days.toString()).toEqual('103', 'days selector');
        });

        it('should allows modifications - icon', async () => {
            await page.iconButton$.click();

            browser.wait(ExpectedConditions.visibilityOf(modalPageIconSelection), navigateSleep);

            const title = await modalPageIconSelection_title.getText();

            expect(title).toEqual('Select an icon');
        });

        it('should have a list of 21 icons', async () => {
            const numberOfIcons = await modalPageIconSelection_listIcon.count();

            expect(numberOfIcons).toEqual(21);
        });

        it('should navigate back when clicking on 1 icon', async () => {
            // click on 1st element
            await modalPageIconSelection_listIcon.first().click();

            browser.wait(ExpectedConditions.invisibilityOf(modalPageIconSelection), navigateSleep);
        });

        it('icon selected should a gamepad', async () => {


            const iconName = await iconButtonIcon$.getAttribute('ng-reflect-name');

            expect(iconName).toEqual('game-controller-b');
        });

        it('should allow deletion', async () => {
            await deleteIcon.click();

            browser.wait(ExpectedConditions.visibilityOf(deleteAlert), navigateSleep);

            const title = await deleteAlert_title.getText();

            expect(title).toEqual('Delete');
        });

        it('should close delete alert on cancel', async () => {
            await deleteAlert_cancel.click();

            browser.wait(ExpectedConditions.invisibilityOf(deleteAlert), navigateSleep);

        });


    });
});
