let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }),10000;

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain(" Get started with Team")
  }),10000;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }),10000;
  
  afterEach(() => {
    page.close();
  });
   
  test("Blog", async () => {
    await page.goto("https://github.com/features");
    const title = await page.title();
    expect(title).toContain("Features | GitHub · GitHub");
  }),10000;

  test("The h1 should contain 'Features'", async () => {
    const expected = "Search code, repositories, users, issues, pull requests...";
    await page.goto("https://github.com/features/");
    const actual = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
    }),10000;

    test("The h2 should contain", async () => {
      const expected = "Use saved searches to filter your results more quickly";
      await page.goto("https://github.com/features/");
      const actual = await page.$eval("h2", (link) => link.textContent);
      expect(actual).toContain(expected);
      }),10000;

  });