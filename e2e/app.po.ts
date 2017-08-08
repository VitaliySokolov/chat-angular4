import { browser, by, element } from 'protractor';

export class ChatAngular4Page {
  navigateTo() {
    return browser.get('/');
  }

  getDemoText() {
    return element(by.css('.demo-title')).getText();
  }
}
