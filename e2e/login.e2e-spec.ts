import { ChatAngular4Page } from './login.po';
import { browser, by, element, ExpectedConditions as until } from 'protractor';

describe('login into the App', () => {
  let page: ChatAngular4Page;
  const USER = process.env.USER1_LOGIN,
    PASSWORD = process.env.USER1_PASSWORD;

  beforeEach(() => {
    page = new ChatAngular4Page();
  });

  it('should display user name and online status after login', () => {
    page.navigateToLogin();
    page.setLoginInput(USER);
    page.setPasswordInput(PASSWORD);
    page.pushLoginButton();
    page.waitForAuthbar();
    expect(page.getUserName()).toEqual(USER);
    expect(page.getUserAvatarClasses()).toMatch(/green/);
  });

  // it ('should display user name and online status when saved token is used', () => {
  //   page.pushLogoutButton();
  //   page.navigateToLogin();
  //   page.setLoginInput(USER);
  //   page.setPasswordInput(PASSWORD);
  //   page.pushLoginButton();
  //   page.waitForAuthbar();
  //   const token = page.getToken();
  //   page.pushLogoutButton();
  //   page.navigateTo();
  //   // check if user is not login
  //   page.loadToken(token);
  //   page.navigateTo();
  //   expect(page.getUserName()).toEqual(USER);
  //   expect(page.getUserAvatarClasses()).toMatch(/green/);
  // });
});
