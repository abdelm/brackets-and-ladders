import { createTeamApplication, changeTeamApplicationStatus } from './teamApplications.js';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

describe('Team Applications', function () {
  it('Create a new team application', function () {
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

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

    return teamApplication.then(function (newTeamApp) {
      expect(newTeamApp).to.not.be.undefined;
      expect(newTeamApp[0].teamName).to.equal('demo-team');
      expect(newTeamApp[0].username).to.equal('demouser');
      expect(newTeamApp[0].status).to.equal('Pending');
    });
  });

  it('Change status of a team application', function () {
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

    return appStatus.then(function (teamApp) {
      expect(teamApp).to.not.be.undefined;
      expect(teamApp[0].status).to.equal('Approved');
    });
  });
});
