const { Builder, By, Key, until } = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const Register = require('./Pages/register.js');
const Login = require('./Pages/login.js');
const Loggedin = require('./Pages/loggedin.js');
const config = require('./config.js');
var browser;
var newUsername, newPassword, firstName, lastName;

test.describe('Test Suite for Registration and Login', function () {
    this.timeout(config.MOCHA_TIMEOUT);

    test.before(function () {
        browser = new Builder()
            .forBrowser(config.BROWSER)
            .build();
        browser.manage().window().maximize();
    });

    test.after(function () {
        browser.quit();
    });

    // This test case is to verify new user can register successfully

    test.it('Case 01: New User Registration', async function () {
        await browser.get(config.LOGIN_URL);
        var login = new Login(browser);
        await login.register();
        var register = new Register(browser);
        var actualUrl, actualText;
        
        var currentTime = new Date().getTime().toString();
        newUsername = "MarkGou_" + currentTime;
        newPassword = "Password" + currentTime;
        firstName = "Mark";
        lastName = "Gou";

        await register.setFirstName(firstName);
        await register.setLastName(lastName);
        await register.setUserName(newUsername);
        await register.setPassword(newPassword);
        await register.register();
        await browser.wait(until.urlIs(config.LOGIN_URL));
        
        actualText = await login.getBanner();
        assert.equal(actualText, config.REGISTRATION_SUCCESSFUL);
     
    
    });

    // This test case is to verify once user logged in with correct credentials, 
    // the user¡¯s first name is correctly displayed and their full name appears 
    // under the ¡°All registered users¡±list.
    // User created at case 01 is used in this case for signing in.

    test.it('Case 02: User Login', async function () {
        await browser.get(config.LOGIN_URL);
        var login = new Login(browser);
        var loggedin = new Loggedin(browser);
        var actualName, actualFullName, nameList;
        await login.setUserName(newUsername);
        await login.setPassword(newPassword);
        await login.login();
        actualName = await loggedin.getFirstName();
        assert.equal(actualName, "Hi " + firstName + "!");
        fullName = await loggedin.getNameFromList();
        assert.equal(fullName, firstName + " " + lastName + " - Delete");
    });
});
