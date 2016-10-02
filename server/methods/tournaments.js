//Import Packages
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//Import Collection
import Tournaments from '../../client-server/collections/tournamentsCollection';


//Methods for tournaments
const createTournament = new ValidatedMethod({
    name: "tournament_create",
    validate: new SimpleSchema({
        tournamentName: { type: String },
        tournamentHost: { type: String },
        tournamentGame: { type: String }
    }).validator(),
    run({tournamentName, tournamentHost, tournamentGame}) {
        let insertTournament = Tournaments.insert({
            tournamentName: tournamentName,
            tournamentHost: tournamentHost,
            tournamentGame: tournamentGame,
            dateCreated: new Date()
        });
    }
});

const addTeamToTournament = new ValidatedMethod({
    name: "tournament_add_team",
    validate: new SimpleSchema({
        tournamentId: { type: String },
        team: { type: [Object] }
    }).validator(),
    run({tournamentId, team}) {
        let insertTeam = Tournaments.update(
            { _id: tournamentId },
            { $push: { teams: team }}
        );
    }
});