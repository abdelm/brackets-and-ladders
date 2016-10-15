//Import Packages
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//Import Collection
import PlayerApplications from '../../client-server/collections/playerAppsCollection';


//Methods for teams
const createPlayerApplication = new ValidatedMethod({
    name: "player_application_create",
    validate: new  SimpleSchema({
        teamName: { type: String },
        username: { type: String },
        applicantId: { type: String }
    }).validator(),
    run({teamName, username, applicantId}) {
        let insertPlayerApplication = PlayerApplications.insert({
            teamName: teamName,
            username: username,
            applicantId: applicantId,
            dateCreated: new Date(),
            status: "Pending"
        });
    }
});

const changePlayerApplicationStatus = new ValidatedMethod({
    name: "player_application_status_change",
    validate: new SimpleSchema({
        status: { type: String },
        applicationId : { type: String }
    }).validator(),
    run({status, applicationId}) {
        let changeStatus = PlayerApplications.update(
            { _id: applicationId },
            { $set: { status: status } }
        );
    }
});

module.exports = {createPlayerApplication, changePlayerApplicationStatus};
