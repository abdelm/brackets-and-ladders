//Import Packages
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//Import Collection
import TeamApplications from '../../client-server/collections/teamAppsCollection';


//Methods for teams 
const createTeamApplication = new ValidatedMethod({
    name: "team_application_create",
    validate: new  SimpleSchema({
        tournamentId: { type: String },
        teamName: { type: String },
        username: { type: String },
    }).validator(),
    run({tournamentId, teamName, username}) {
        let insertTeamApplication = TeamApplications.insert({
            tournamentId: tournamentId,
            teamName: teamName,
            username: username,
            dateCreated: new Date(),
            status: "Pending"
        });
    }
});

const changeTeamApplicationStatus = new ValidatedMethod({
    name: "Team_application_status_change",
    validate: new SimpleSchema({
        status: { type: String },
        applicationId : { type: String }
    }).validator(),
    run({status, applicationId}) {
        let changeStatus = TeamApplications.update(
            { _id: applicationId }, 
            { $set: { status: status } }
        );
    }
});