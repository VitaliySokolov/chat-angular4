import { browser, by, element, ExpectedConditions as until} from 'protractor';

export class ChatAngular4Page {
  navigateTo() {
    return browser.get('/');
  }
  navigateToLogin() {
    return browser.get('/#/login');
  }

  setLoginInput(userName: string) {
    browser.driver.findElement(by.id('login')).sendKeys(userName);
  }

  setPasswordInput(password: string) {
    browser.driver.findElement(by.id('password')).sendKeys(password);
  }

  pushLoginButton() {
    browser.waitForAngularEnabled(false);
    browser.driver.findElement(by.id('submit')).click();
  }

  getUserName() {
    return element(by.css('.authbar-wrapper .user-name')).getText();
  }

  getUserAvatarClasses() {
    return element(by.css('.authbar-wrapper .avatar')).getAttribute('class');
  }

  waitForAuthbar() {
    const el = element(by.css('.authbar-wrapper'));
    browser.wait(until.presenceOf(el), 5000);
  }

  getToken() {
    const userId = browser.executeScript('return window.localStorage.getItem("user");');
    return browser.executeScript('return window.localStorage.getItem("' + userId + '");');
  }

  loadToken(token: any) {
    const userId = browser.executeScript('return window.localStorage.getItem("user");');
    return browser.executeScript('return window.localStorage.setItem("' + userId + '", "' + token + '");');
  }

  pushLogoutButton() {
    browser.driver.findElement(by.id('logout')).click();
  }

}
