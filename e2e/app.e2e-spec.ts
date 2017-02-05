import { AngularBestPage } from './app.po';

describe('angular-best App', function() {
  let page: AngularBestPage;

  beforeEach(() => {
    page = new AngularBestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
