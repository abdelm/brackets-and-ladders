import { createTournament, addTeamToTournament, removeTournament } from './tournaments.js';
import { chai, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

describe('Tournaments', function () {
  it('Create a new tournament', function () {
    Meteor.call('test.resetDatabase', function() {
      return true;
    });

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

    return tournament.then(function (newTournament) {
      expect(newTournament).to.not.be.undefined;
      expect(newTournament[0].tournamentName).to.equal('myTournament');
      expect(newTournament[0].tournamentHost).to.equal('demouser');
      expect(newTournament[0].tournamentGame).to.equal('League of Legends');
    });
  });

  it('Add a team to an existing tournament', function () {
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

    return tournamentTeam.then(function (tournament) {
      expect(tournament).to.not.be.undefined;
      expect(tournament[0].teams[0]).to.equal('demo-team');
    });
  });

  it('Remove an existing tournament', function () {
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

    return deleteTournament.then(function (tournament) {
      expect(tournament).to.not.be.undefined;
      expect(tournament[0]).to.be.undefined;
    });
  });
});
