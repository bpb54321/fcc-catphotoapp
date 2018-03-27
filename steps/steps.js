// Cucumber
const Cucumber = require('cucumber');
const setWorldConstructor = Cucumber.setWorldConstructor;
const Given = Cucumber.Given;
const When = Cucumber.When;
const Then = Cucumber.Then;
const BeforeAll = Cucumber.BeforeAll;
const AfterAll = Cucumber.AfterAll;

// Selenium Webdriver
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const Key = webdriver.Key;

// Chai
const expect = require('chai').expect;

// Define World Class (provides the 'this' in all Cucumber steps)
let CustomWorld = function() {
  this.driver = new webdriver.Builder().forBrowser('chrome').build();

  let screen_sizes = {
    'xs': {
      width: 320,
      height: 600,
    },
  };
  let screen_size = screen_sizes['xs'];
  
  // await this.driver.manage().window().setRect({
  //   width: screen_size.width,
  //   height: screen_size.height,
  // });

  this.page = {
    element_locators: {
      primary_heading: '.primary-heading',
      body_paragraph: '.body-paragraph',
    },
    group_locators: {
    },
  };
}

setWorldConstructor(CustomWorld);

Given('we load the page with url {string}', async function (url) {
  await this.driver.get(url);
});

When('I add {int}', function (int) {
  this.value = this.value + int;
});

Then('the element {word} is present', async function (element_name) {
  let web_element = await this.driver.findElement(By.css(this.page.element_locators[element_name]));
  this.page[element_name] = web_element;
  expect(this.page[element_name]).to.not.be.undefined;
});
