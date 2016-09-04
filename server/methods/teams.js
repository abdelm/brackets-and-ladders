//Import Packages
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//Import Collection
import Teams from '../../client-server/collections/teamsCollection';


//Methods for teams 
/*export const createTeam = new ValidatedMethod({
    name: "team_create",
    validate: new  SimpleSchema({
        teamName: { type: String },
        leaders: { type: Object, minCount: 1 },
        members: { type: Object, minCount: 5 }
    }).validator(),
    run({ teamName, leaders, members }) {
        if (error) {
            return error
        } else {
            let insertTeam = Teams.insert({
                teamName: teamName,
                leaders: leaders,
                members: members,
                dateCreated: new Date()
            });
            console.log(insertTeam);
            return insertTeam
        }
    }
});*/

Meteor.methods({

    "team_create"(teamName, leaders, members) {
        let insertTeam = Teams.insert({
            teamName: teamName,
            leaders: leaders,
            members: members,
            dateCreated: new Date()
        });
        console.log(insertTeam);
        return insertTeam   
    }

});