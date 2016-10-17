// Import Packages
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { createTeam, addPlayerToTeam } from './teams.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

// Describe a testcase for the teams feature
describe('Teams', function () {
    // This test creates a new team
    it('Create a new team', function () {
        // Empty the test database
        Meteor.call('test.resetDatabase', function() {
          return true;
        });

        // Sample member list
        let leaders = ['leader'];
        let members = ['member1', 'member2', 'member3', 'memeber4', 'member5'];

        // Create a team and wrap it in a Promise
        const team = new Promise((resolve, reject) => {
          try {
            var result = createTeam.call({
                'teamName' : 'demo-team',
                'leaders' : leaders,
                'members' : members
            });
            const newTeam = Teams.find({'teamName': 'demo-team'}).fetch();
            resolve(newTeam);
          } catch (err) {
            reject(err);
          }
        });

        // Check if the team was created and if details match
        return team.then(function (newTeam) {
          expect(newTeam).to.not.be.undefined;
          expect(newTeam[0].teamName).to.equal('demo-team');
        });
    });

    // This test adds a new player to the team
    it('Add a new player to a team', function () {
        // Add team player and wrap the result in Promise
        const teamPlayer = new Promise((resolve, reject) => {
          try {
            let team = Teams.find({'teamName': 'demo-team'}).fetch();
            var result = addPlayerToTeam.call({
              'teamId' : team[0]._id,
              'member' : 'demo-user'
            });
            team = Teams.find({'teamName': 'demo-team'}).fetch();
            resolve(team);
          } catch (err) {
            reject(err);
          }
        });

        // Make sure the player was added to the member list
        return teamPlayer.then(function (team) {
          expect(team).to.not.be.undefined;
          expect(team[0].members[5]).to.equal('demo-user');
        });
    });
});
