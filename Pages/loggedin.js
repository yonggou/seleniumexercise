const { By, Key, until } = require('selenium-webdriver');
var config = require('../config.js');

function loggedin(browser) {
    this.browser = browser;
}

loggedin.prototype.getFirstName = async function () {

   const element = await this.browser.wait(
       until.elementLocated(By.xpath(config.LOGGEDIN_FIRSTNAME_XPATH)),
        config.BROSWER_WAIT_TIMEOUT
    );
   const name = await element.getText(); 
   return name;
};

loggedin.prototype.getNameFromList = async function () {
    
    const element = await this.browser.wait(
        until.elementLocated(By.xpath(config.LOGGEDIN_NAMELIST_XPATH)),
        config.BROSWER_WAIT_TIMEOUT
    );
   const items = await element.findElements(By.tagName('li'));
   return items[0].getText();
};


module.exports = loggedin;