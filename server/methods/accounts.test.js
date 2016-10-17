// Import Packages
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// Method to reset the test database
Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

// Describe the test case for the
// Accounts method
describe('Accounts', function () {
  // This test will try to create a new account
  it('Create a new account', function () {
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

    // Create a new user and wrap it in a Promise
    const createUser = new Promise((resolve, reject) => {
      try {
        var result = Accounts.createUser({
          username: 'demotest',
          password: 'demopassword',
        });

        const newUser = Meteor.users.findOne();
        resolve(newUser);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the new user exists, and if the username matches
    return createUser.then(function (newUser) {
      expect(newUser).to.not.be.undefined;
      expect(newUser.username).to.equal('demotest');
    });
  });
});
