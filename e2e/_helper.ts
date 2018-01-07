import { browser } from 'protractor';
import * as path from 'path';
import * as fs from 'fs';

export const navigateSleep = 1000;
export const beforeEachSleep = 500;

export function takeScreenShot(fileName?: string, pathName?: string) {
    const pathNameFinal = pathName || './e2e/screenshots';
    const fileNameFinal = fileName || Date.now().toString();
    browser.takeScreenshot()
        .then((png) => {
            const file = path.resolve(path.join(pathNameFinal, fileNameFinal + '.png'));
            fs.writeFileSync(file, png, { encoding: 'base64' });
        });
}