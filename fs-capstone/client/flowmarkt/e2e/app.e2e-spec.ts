import { FlowmarktPage } from './app.po';

describe('flowmarkt App', function() {
  let page: FlowmarktPage;

  beforeEach(() => {
    page = new FlowmarktPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
