const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");
const puppeteer = require("puppeteer");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Successful booking", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });
  test("Movie Selection", async () => {
    await page.click(
      "body > nav > a.page-nav__day.page-nav__day_chosen > span.page-nav__day-week"
    );
    await page.waitForSelector("span");
    await page.click(
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li"
    );
    await page.waitForSelector("li");
    const expected = "Начало сеанса: 10:00";
  }, 90000);

  test("Movie Choice another time ", async () => {
    await page.click(
      "body > nav > a.page-nav__day.page-nav__day_chosen > span.page-nav__day-week"
    );
    await page.waitForSelector("span");
    await page.click(
      "body > main > section:nth-child(1) > div:nth-child(3) > ul > li"
    );
    await page.waitForSelector("li");
    const expected = "Начало сеанса: 11:00";
  },90000);
});
describe("Unsuccessful booking", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/hall.php");
  });
  test("Should try to book unavailable ticket, but unsuccessfully", async () => {
    await clickElement(page, "body nav a:nth-child(2)");
    await clickElement(page, "body main section:nth-child(2) div:nth-child(3) ul li a");
    await clickElement(page, ".buying-scheme__wrapper div:nth-child(9) span:nth-child(2)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("false");
  });
});