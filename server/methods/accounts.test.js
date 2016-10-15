import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

describe('Accounts', function () {
  it('Create a new account', function () {
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

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

    return createUser.then(function (newUser) {
      expect(newUser).to.not.be.undefined;
      expect(newUser.username).to.equal('demotest');
    });
  });
});
