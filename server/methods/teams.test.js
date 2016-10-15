import { chai, expect } from 'meteor/practicalmeteor:chai';
import { createTeam, addPlayerToTeam } from './teams.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

describe('Teams', function () {
  it('Create a new team', function () {
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

    let leaders = ['leader'];
    let members = ['member1', 'member2', 'member3', 'memeber4', 'member5'];

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

    return team.then(function (newTeam) {
      expect(newTeam).to.not.be.undefined;
      expect(newTeam[0].teamName).to.equal('demo-team');
    });
  });
  /*
  it('Add a new player to a team', function () {
    const teamPlayer = new Promise((resolve, reject) => {
      try {
        const team = Teams.find({'teamName': 'demo-team'}).fetch();
        console.log(addPlayerToTeam);
        var result = addPlayerToTeam.call({
          'teamId' : team[0]._id,
          'member' : 'demo-user'
        });
        console.log(result);
        resolve(team);
      } catch (err) {
        reject(err);
      }
    });

    return teamPlayer.then(function (team) {
      console.log(team);
      expect(team).to.not.be.undefined;
      console.log(team[0].members);
      expect(team[0].members[6]).to.equal('demo-user');
    });
});*/
});
