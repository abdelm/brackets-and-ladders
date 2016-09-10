//Import Packages
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//Import Collection
import PlayerApplications from '../../client-server/collections/playerAppCollection';


//Methods for teams 
const createPlayerApplication = new ValidatedMethod({
    name: "player_application_create",
    validate: new  SimpleSchema({
        teamName: { type: String },
        username: { type: String },
        applicantId: { type: String}
    }).validator(),
    run({teamName, username, applicantId}) {
        let insertPlayerApplication = PlayerApplications.insert({
            teamName: teamName,
            username: username,
            applicantId: applicantId,
            dateCreated: new Date()
        });
    }
});