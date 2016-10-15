//Import Packages
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//Import Collection
import Teams from '../../client-server/collections/teamsCollection';

//Methods for teams
const createTeam = new ValidatedMethod({
    name: "team_create",
    validate: new  SimpleSchema({
        teamName: { type: String },
        leaders: { type: [String] },
        members: { type: [String] }
    }).validator(),
    run({teamName, leaders, members}) {
        let insertTeam = Teams.insert({
            teamName: teamName,
            leaders: leaders,
            members: members,
            dateCreated: new Date()
        });
    }
});

const addPlayerToTeam = new ValidatedMethod({
    name: "team_add_player",
    validate: new SimpleSchema({
        teamId: { type: String },
        member: { type: String }
    }).validator(),
    run({teamId, member}) {
        let insertPlayer = Teams.update(
            { _id: teamId },
            { $push: { members: member } }
        );
    }
});

module.exports = {createTeam, addPlayerToTeam};
