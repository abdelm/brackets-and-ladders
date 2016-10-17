// Import Packages
import { createTeamApplication, changeTeamApplicationStatus } from './teamApplications.js';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

// Describe a test case for team applications feature
describe('Team Applications', function () {
  // This test creates a new team application for a tournament
  it('Create a new team application', function () {
    // Empty the test database
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

    // Create a team application and wrap it in a Promise
    const teamApplication = new Promise((resolve, reject) => {
      try {
        var result = createTeamApplication.call({
            'tournamentId' : '123',
            'teamName' : 'demo-team',
            'username' : 'demouser'
        });
        const newTeamApp = TeamApplications.find({'tournamentId': '123'}).fetch();
        resolve(newTeamApp);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the application was creatd, and the details match correctly
    return teamApplication.then(function (newTeamApp) {
      expect(newTeamApp).to.not.be.undefined;
      expect(newTeamApp[0].teamName).to.equal('demo-team');
      expect(newTeamApp[0].username).to.equal('demouser');
      expect(newTeamApp[0].status).to.equal('Pending');
    });
  });

  // This test changes the status of a team application
  it('Change status of a team application', function () {
    // Update the status and wrap the result in a Promise
    const appStatus = new Promise((resolve, reject) => {
      try {
        let teamApp = TeamApplications.find({'tournamentId': '123'}).fetch();
        var result = changeTeamApplicationStatus.call({
          'applicationId' : teamApp[0]._id,
          'status' : 'Approved'
        });
        teamApp = TeamApplications.find({'tournamentId': '123'}).fetch();
        resolve(teamApp);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the status was actually updated
    return appStatus.then(function (teamApp) {
      expect(teamApp).to.not.be.undefined;
      expect(teamApp[0].status).to.equal('Approved');
    });
  });
});
