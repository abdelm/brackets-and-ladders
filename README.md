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

Tests are run using the [Mocha](http://mochajs.org/) test framework and the [Chai](http://chaijs.com/) assertion library. [PhantomJS](http://phantomjs.org/) is used to launch the tests, and run them in the command line.

### Creating Tests
The file format for the test files is `FILENAME.test.js` where `FILENAME` is the name of the component you're testing.

Server tests are inside the `server` directory, while client tests go inside the component directory in the `client directory`.

### Running Tests
* `npm test`: Executes all the client and server tests
* `npm test:watch`: Executes all client and server tests, and watches for changes in the files

### Continuous Integration

[Travis CI](https://travis-ci.org/) will be used to continuously run the tests and will be integrated with GitHub.
