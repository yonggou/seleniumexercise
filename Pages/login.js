const { By, Key, until } = require('selenium-webdriver');
var config = require('../config.js');

function login(browser) {
    this.browser = browser;
}

login.prototype.setUserName = async function (Name) {

    await this.browser.wait(
        until.elementLocated(By.name('username')),
        20000
    )
        .then(element => {
            element.sendKeys(Name);
        }); 
};

login.prototype.setPassword = async function (Password) {
    
    await  this.browser.wait(
        until.elementLocated(By.name('password')),
        20000
    )
        .then(element => {
            element.sendKeys(Password);
        });
};

login.prototype.login = async function () {

    
    await this.browser.wait(
        until.elementLocated(By.className('btn-primary')),
        20000
    )
        .then(element => {
            element.click();
        });

};

login.prototype.register = async function () {
    
    await this.browser.wait(
        until.elementLocated(By.className('btn-link')),
        20000
    )
        .then(element => {
            element.click();
        });
};


login.prototype.getBanner = async function () {

    const str = await this.browser.findElement(By.xpath(config.LOGIN_BANNER_XPATH)).getText();
    return str;
};

module.exports = login;