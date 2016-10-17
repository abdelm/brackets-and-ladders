// Import Packages
import { createPlayerApplication, changePlayerApplicationStatus } from './playerApplications.js';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

// Describe a test case for the
// player applications feature
describe('Player Applications', function () {
  // This test attempts to create a new player application
  // for an existing team
  it('Create a new player application', function () {
    // Empty the test database
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

    // Create a player application and wrap it in a Promise
    const playerApplication = new Promise((resolve, reject) => {
      try {
        var result = createPlayerApplication.call({
            'teamName' : 'demo-team',
            'username' : 'demouser',
            'applicantId' : '321'
        });
        const newApp = PlayerApplications.find({'applicantId': '321'}).fetch();
        resolve(newApp);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the new application exists and matches the details
    return playerApplication.then(function (newApp) {
      expect(newApp).to.not.be.undefined;
      expect(newApp[0].teamName).to.equal('demo-team');
      expect(newApp[0].username).to.equal('demouser');
    });
  });

  // This test updates the status of a player application
  it('Change status of a player application', function () {
    // Update status of application and wrap result in Promise
    const appStatus = new Promise((resolve, reject) => {
      try {
        let playerApp = PlayerApplications.find({'applicantId': '321'}).fetch();
        var result = changePlayerApplicationStatus.call({
          'applicationId' : playerApp[0]._id,
          'status' : 'Approved'
        });
        playerApp = PlayerApplications.find({'applicantId': '321'}).fetch();
        resolve(playerApp);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the status was actually updated
    return appStatus.then(function (playerApp) {
      expect(playerApp).to.not.be.undefined;
      expect(playerApp[0].status).to.equal('Approved');
    });
  });
});
