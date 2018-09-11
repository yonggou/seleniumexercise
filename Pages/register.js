const { By, Key, until } = require('selenium-webdriver');

function register(browser) {
    this.browser = browser;
}

register.prototype.setFirstName = async function (Name) {

    const element = await this.browser.findElement(By.name('firstName'));
    await element.sendKeys(Name);
};

register.prototype.setLastName = async function (Name) {

    const element = await this.browser.findElement(By.name('lastName'));
    await element.sendKeys(Name);
};

register.prototype.setUserName = async function (Name) {

    const element = await this.browser.findElement(By.name('username'));
    await element.sendKeys(Name);
};

register.prototype.setPassword = async function (Password) {

    const element = await this.browser.findElement(By.name('password'));
    await element.sendKeys(Password);
};

register.prototype.register = async function () {
    const element = await this.browser.findElement(By.className('btn-primary'));
    await element.click();
};

register.prototype.getUrl =  async function () {
    await  this.browser.getCurrentUrl()
     .then( function (currentUrl) {
         return currentUrl;
    });
};

register.prototype.cancel = async function () {

    const element = await this.browser.findElement(By.className('btn-link'));
    await element.click();
};

module.exports = register;