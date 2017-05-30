import { ChatAngular4Page } from './app.po';

describe('chat-angular4 App', () => {
  let page: ChatAngular4Page;

  beforeEach(() => {
    page = new ChatAngular4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
