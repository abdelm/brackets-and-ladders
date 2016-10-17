// Import Packages
import { createTournament, addTeamToTournament, removeTournament } from './tournaments.js';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

// Describes test case for tournaments feature
describe('Tournaments', function () {
  // This test creates a new tournament
  it('Create a new tournament', function () {
    // Empty test database
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

    // Create tournament and wrap it in a Promise
    const tournament = new Promise((resolve, reject) => {
      try {
        var result = createTournament.call({
            'tournamentName' : 'myTournament',
            'tournamentHost' : 'demouser',
            'tournamentGame' : 'League of Legends'
        });
        const newTournament = Tournaments.find({'tournamentName': 'myTournament'}).fetch();
        resolve(newTournament);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the tournament was created, and details match
    return tournament.then(function (newTournament) {
      expect(newTournament).to.not.be.undefined;
      expect(newTournament[0].tournamentName).to.equal('myTournament');
      expect(newTournament[0].tournamentHost).to.equal('demouser');
      expect(newTournament[0].tournamentGame).to.equal('League of Legends');
    });
  });

  // This test attempts to add a team to the tournament
  it('Add a team to an existing tournament', function () {
    // Add new team to tournament and wrap result in Promise
    const tournamentTeam = new Promise((resolve, reject) => {
      try {
        let tournament = Tournaments.find({'tournamentName': 'myTournament'}).fetch();
        var result = addTeamToTournament.call({
          'tournamentId' : tournament[0]._id,
          'team' : 'demo-team'
        });
        tournament = Tournaments.find({'tournamentName': 'myTournament'}).fetch();
        resolve(tournament);
      } catch (err) {
        reject(err);
      }
    });

    // Check if the team was added to the teams list
    return tournamentTeam.then(function (tournament) {
      expect(tournament).to.not.be.undefined;
      expect(tournament[0].teams[0]).to.equal('demo-team');
    });
  });

  // This test removes an existing tournament
  it('Remove an existing tournament', function () {
    // Delete tournament and wrap the result in a Promise
    const deleteTournament = new Promise((resolve, reject) => {
      try {
        let tournament = Tournaments.find({'tournamentName': 'myTournament'}).fetch();
        var result = removeTournament.call({
          'tournamentId' : tournament[0]._id
        });
        tournament = Tournaments.find({'tournamentName': 'myTournament'}).fetch();
        resolve(tournament);
      } catch (err) {
        reject(err);
      }
    });

    // Make sure the tournament was actually deleted
    return deleteTournament.then(function (tournament) {
      expect(tournament).to.not.be.undefined;
      expect(tournament[0]).to.be.undefined;
    });
  });
});
