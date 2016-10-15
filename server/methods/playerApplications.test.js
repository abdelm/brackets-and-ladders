import { createPlayerApplication, changePlayerApplicationStatus } from './playerApplications.js';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

describe('Player Applications', function () {
  it('Create a new player application', function () {
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

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

    return playerApplication.then(function (newApp) {
      expect(newApp).to.not.be.undefined;
      expect(newApp[0].teamName).to.equal('demo-team');
      expect(newApp[0].username).to.equal('demouser');
    });
  });

  it('Change status of a player application', function () {
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

    return appStatus.then(function (playerApp) {
      expect(playerApp).to.not.be.undefined;
      expect(playerApp[0].status).to.equal('Approved');
    });
  });
});
