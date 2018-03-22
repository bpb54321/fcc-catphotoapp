// Selenium Webdriver
// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const Key = webdriver.Key;

// Change the colors in the console
var colors = require('colors');

// Chai JS assertion library
const expect = require('chai').expect;

// Custom utilities library
const util = require('./utilities');

(async function() {
  let driver;
  let page;
  let builder;
  let screen_sizes;
  let screen_size;

  try {
    builder = new webdriver.Builder().forBrowser('chrome');
    driver = await builder.build();
    driver.get('file:///Users/brianblosser/Sites/freecodecamp/catphotoapp/index.html');

    screen_sizes = {
      'xs': {
        width: 320,
        height: 600,
      },
    };

    console.log(colors.magenta.bold(`[xs]\n`));

    screen_size = screen_sizes['xs'];
    await driver.manage().window().setRect({
      width: screen_size.width,
      height: screen_size.height,
    });

    // Setup page object: get references to WebElements that we will test
    console.log(colors.yellow(`Checking that all page elements are present...\n`));
    page = {
      element_locators: {
        primary_heading: '.primary-heading',
        body_paragraph: '.body-paragraph',
      },
      group_locators: {
      },
    };

    for (let element_locator in page.element_locators) {
      page[element_locator] = await driver.findElement(By.css(page.element_locators[element_locator]));
      console.log(colors.green(`\t${element_locator} is present.\n`));
    }

    for (let group_locator in page.group_locators) {
      page[group_locator] = await driver.findElements(By.css(page.group_locators[group_locator]));
    }

    // Check heading text
    let primary_heading_text = await page.primary_heading.getText();
    console.log(colors.yellow(`Checking that page.primary_heading has correct text...\n`));
    expect(primary_heading_text).to.equal('CatPhotoApp');
    console.log(colors.green(`\tpage.primary_heading has correct text.\n`));

    // Check body paragraph text
    await util.checkElementText(page.body_paragraph, 'Hello paragraph');

    // TO-DO: Make a function that checks whether an element's text matches the expected text



    
    await driver.quit();
  } catch(error) {
    util.printErrorAndExit(error, driver);
  }
})();


