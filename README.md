# Brackets and Ladders
SEP G04 Assignment

Besides using standard Meteor and React, ReactDOM packages, this application uses:
- Kadira: [flow-router](https://github.com/kadirahq/flow-router)
- Kadira: [react-mounter](https://github.com/kadirahq/react-mounter)
- Kadira: [dochead](https://github.com/kadirahq/meteor-dochead)
- [Semantic UI](http://semantic-ui.com/)

Feel free to explore those packages to learn what they do. An example of Kadira in action is within the ```/index.js``` file. An example of a Semantic UI template in use is in the ```/generic/NavBar.js``` file.

## Pre-requisites
* NodeJS

## Installation
**1.** Install Meteor
```
curl https://install.meteor.com/ | sh
```

**2.** Clone the repository locally
```
git clone https://github.com/sguillema/brackets-and-ladders.git
```

**3.** Install necessary NPM packages
```
meteor npm install
```

**4.** Run
```
npm start
```

## Testing

Tests are run using the [Mocha](http://mochajs.org/) test framework and the [Chai](http://chaijs.com/) assertion library. [PhantomJS](http://phantomjs.org/) is used to launch the tests, and run them in the command line. In addition to that, [Travis CI](https://travis-ci.org/) will be used to continuously run the tests and will be integrated with GitHub.

### Creating Tests
The file format for the test files is `FILENAME.test.js` where `FILENAME` is the name of the component you're testing.

Server tests are inside the `server` directory, while client tests go inside the component directory in the `client directory`.

### Running Tests
* `npm test`: Executes all the client and server tests
* `npm test:watch`: Executes all client and server tests, and watches for changes in the files

### Example Output

```
I20161004-11:48:22.669(11)?
I20161004-11:48:22.727(11)? --------------------------------
I20161004-11:48:22.729(11)? ----- RUNNING SERVER TESTS -----
I20161004-11:48:22.729(11)? --------------------------------
I20161004-11:48:22.730(11)?
I20161004-11:48:22.730(11)?
I20161004-11:48:22.730(11)?
I20161004-11:48:22.731(11)?   create account
I20161004-11:48:22.732(11)?
I20161004-11:48:22.733(11)?     ✓ should be able to create a user (133ms)
I20161004-11:48:22.733(11)?
I20161004-11:48:22.733(11)?
I20161004-11:48:22.734(11)?   1 passing (169ms)
I20161004-11:48:22.734(11)?
I20161004-11:48:22.735(11)?
I20161004-11:48:22.735(11)? --------------------------------
I20161004-11:48:22.736(11)? ----- RUNNING CLIENT TESTS -----
I20161004-11:48:22.736(11)? --------------------------------
I20161004-11:48:22.736(11)?
=> Started your app.

=> App running at: http://localhost:3100/
I20161004-11:48:24.600(11)?
I20161004-11:48:24.600(11)?
I20161004-11:48:24.610(11)?   RegisterForm
I20161004-11:48:24.624(11)?     ✓ should have an input for the username and password
I20161004-11:48:24.625(11)?
I20161004-11:48:24.625(11)?
I20161004-11:48:24.627(11)?   1 passing (26ms)
I20161004-11:48:24.628(11)?
I20161004-11:48:24.629(11)? stdout:
I20161004-11:48:25.998(11)? All client and server tests finished!
I20161004-11:48:25.999(11)?
I20161004-11:48:26.010(11)? --------------------------------
I20161004-11:48:26.010(11)? SERVER FAILURES: 0
I20161004-11:48:26.011(11)? CLIENT FAILURES: 0
I20161004-11:48:26.011(11)? --------------------------------
```
