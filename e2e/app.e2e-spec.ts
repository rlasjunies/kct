import * as page from './pages/app.po';
import { browser, ExpectedConditions } from 'protractor';
import { takeScreenShot } from './helper/screenshot';

describe('KCT app', function () {

    beforeAll((done) => {
        browser.get(page.url)
            .then(_ => done());
    });

    beforeEach(() => {
    });

    afterEach(() => {
        // takeScreenShot();
    });

    describe('initial screen', () => {
        beforeEach(() => {
        });

        it('should have a title ', () => {
            browser.getTitle()
                .then(title => {
                    expect(title).toEqual(page.title);
                });
        });
    });

    describe('sidebar menu', () => {
        it('should be hidden', () => {
            page.sidebar$.isDisplayed()
                .then(isDisplayed => {
                    expect(isDisplayed).toBeFalsy();
                });
        });

        it('should appears on clicking on the toogle menu ', () => {
            page.sidebarToggle$.click()
                .then(_ => page.sidebar$.isDisplayed())
                .then(isDisplayed => {
                    expect(isDisplayed).toBeTruthy();
                });
        });

        it('should have title', () => {
            browser.wait(ExpectedConditions.textToBePresentInElement(page.sidebarTitle$, page.title), 5000);
        });

        it('should have 2 menus', () => {
            page.sidebarMenus$$.count()
                .then(count => {
                    expect(count).toEqual(2);
                });
        });

        it('should navigate to "about" when clicking on about button', () => {
            browser.wait(ExpectedConditions.elementToBeClickable(page.aboutMenu$), 5000);
            page.aboutMenu$.click()
                .then(_ => {
                    browser.wait(ExpectedConditions.urlContains('about'), 5000);
                });
        });

        it('should sidebar collapsed', () => {
            browser.wait(ExpectedConditions.invisibilityOf(page.sidebar$), 5000);
        });

        it('should be back to "timers" when back button is pressed', () => {
            browser.navigate().back();

            browser.wait(ExpectedConditions.urlContains('timers'), 5000);
        });

        it('should appears again clicking on the toogle menu ', () => {
            browser.wait(ExpectedConditions.elementToBeClickable(page.sidebarToggle$), 5000);
            page.sidebarToggle$.click()
                .then(_ => page.sidebar$.isDisplayed())
                .then(isDisplayed => {
                    expect(isDisplayed).toBeTruthy();
                });
        });

        it('should navigate to "settings" when clicking first', () => {
            browser.wait(ExpectedConditions.elementToBeClickable(page.settingMenu$));
            page.settingMenu$.click();
            browser.wait(ExpectedConditions.urlContains('settings'), 5000);
        });

        it('should sidebar collapsed', () => {
            browser.wait(ExpectedConditions.invisibilityOf(page.sidebar$), 5000);
        });

    });
});
