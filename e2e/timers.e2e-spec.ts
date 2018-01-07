import * as page from './timers.po';
import { browser, ExpectedConditions } from 'protractor';
import { takeScreenShot, beforeEachSleep, navigateSleep, } from './_helper';
import { async } from 'q';

describe('Timers page', () => {

    beforeAll(async () => {
        await browser.get(page.url);
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

        it('should have a title', async () => {
            const title = await browser.getTitle();
            expect(title).toEqual(page.title);
        });
    });

    describe('timers list', () => {
        it('should have 4 timers', async () => {
            const value = await page.timers$$.count();
            expect(value).toBeGreaterThanOrEqual(1);
        });

        it('should navigate to "timer-config" when clicking on', async () => {
            await page.timer1Setting$.click();
            await browser.sleep(navigateSleep);
            const url = await browser.getCurrentUrl();
            expect(url).toContain(page.navigatedTo_TimerConfig);
        });

        it('should navigate to "timers" on back', async () => {
            await browser.navigate().back();
            await browser.sleep(navigateSleep);
            const url = await browser.getCurrentUrl();
            expect(url).toContain('timers');
        });

        it('should navigate to "timer-config" clicking on add', async () => {
            await page.addButton$.click();
            await browser.sleep(navigateSleep);
            const url = await browser.getCurrentUrl();
            expect(url).toContain(page.navigatedTo_TimerConfig);
        });
    });
});