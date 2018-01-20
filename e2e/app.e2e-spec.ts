import * as page from './app.po';
import { browser, ExpectedConditions } from 'protractor';
import { isDate } from 'util';
import { beforeEachSleep, navigateSleep, takeScreenShot } from './_helper';


describe('Games Timers app', function () {

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

        it('should have a title ', async () => {
            const title = await browser.getTitle();
            expect(title).toEqual(page.title);
        });
    });

    describe('sidebar menu', () => {
        it('should be hidden', async () => {
            const isDisplayed = await page.sidebar$.isDisplayed();
            expect(isDisplayed).toBeFalsy();
        });

        it('should appears on clicking on the toogle menu ', async () => {
            await page.sidebarToggle$.click();
            const isDisplayed = await page.sidebar$.isDisplayed();
            expect(isDisplayed).toBeTruthy();
        });

        it('should have title', async () => {
            const title = await page.sidebarTitle$.getText();
            expect(title).toEqual(page.title);
        });

        it('should have 2 menus', async () => {
            const count = await page.sidebarMenus$$.count();
            expect(count).toEqual(2);
        });

        it('should navigate to "about" when clicking on about button', async () => {
            const isDisplayed = await page.aboutMenu$.isDisplayed();

            await page.aboutMenu$.click();
            await browser.sleep(navigateSleep);
            browser.wait(ExpectedConditions.urlContains(page.navigatedTo_About), 5000);
        });

        it('should sidebar collapsed', async () => {
            const isDisplayed = await page.sidebar$.isDisplayed();
            expect(isDisplayed).toBeFalsy();
        });

        it('should be back to "timers" when back button is pressed', async () => {
            await browser.navigate().back();

            const url = await browser.getCurrentUrl();
            expect(url).toContain('timers');
        });

        it('should appears again clicking on the toogle menu ', async () => {
            await page.sidebarToggle$.click();
            const isDisplayed = await page.sidebar$.isDisplayed();
            expect(isDisplayed).toBeTruthy();
        });

        it('should navigate to "settings" when clicking first', async () => {
            await page.settingMenu$.click();
            await browser.sleep(navigateSleep);
            const url = await browser.getCurrentUrl();
            expect(url).toContain(page.navigatedTo_Setting);
        });

        it('should sidebar collapsed', async () => {
            const isDisplayed = await page.sidebar$.isDisplayed();
            expect(isDisplayed).toBeFalsy();
        });

    });
});
