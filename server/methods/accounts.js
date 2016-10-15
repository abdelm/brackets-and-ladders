//Import Packages
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

//Serverside account creation
Meteor.methods({
    // Initiate the creation of a User Account for the app
    'accounts.create'(username, password) {
        check(username, String);
        check(password, String);

        // Deny creation of a User Account when logged in
        if (Meteor.user()) {
            throw new Meteor.Error('You are currently logged in.');
        }

        // Create user with email, username and password properties
        Accounts.createUser({
            username: username,
            password: password
        });
    }
});
