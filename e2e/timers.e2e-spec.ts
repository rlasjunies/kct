import * as page from './pages/timers.po';
import { browser, ExpectedConditions } from 'protractor';
import { takeScreenShot } from './helper/screenshot';

describe('Timers page', () => {

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

        it('should have a title', () => {
            browser.getTitle()
                .then(title => {
                    expect(title).toEqual(page.title);
                });
        });
    });

    describe('timers list', () => {
        it('should have 4 timers', () => {
            page.timers$$.count()
                .then(value => {
                    expect(value).toEqual(4);
                });
        });
    });

});