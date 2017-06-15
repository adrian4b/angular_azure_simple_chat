import { AzscPage } from './app.po';

describe('azsc App', () => {
  let page: AzscPage;

  beforeEach(() => {
    page = new AzscPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
