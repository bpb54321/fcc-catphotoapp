const Cucumber = require('cucumber');
const setWorldConstructor = Cucumber.setWorldConstructor;
const Given = Cucumber.Given;
const When = Cucumber.When;
const Then = Cucumber.Then;
const expect = require('chai').expect;

// Define World Class
class World {
  constructor() {
    this.value = 0;
  }
}

setWorldConstructor(World);

Given('I start with {int}', function (int) {
  this.value = int;
});

When('I add {int}', function (int) {
  this.value = this.value + int;
});

Then('I end up with {int}', function (int) {
  expect(this.value).to.equal(int);
});