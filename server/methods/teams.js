//Import Packages
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

//Team collection schema
Teams = new Mongo.Collection("teams");

TeamMember = new SimpleSchema({
    memberUsername: {
        type: String,
        label: "Team member username",
        max: 20,
    },
});

Team = new SimpleSchema({
    name: {
        type: String,
        label: "Team Name",
        max: 20,
    },
    leader: {
        label: "Leader username",
        type: String,
    },
    members: {
        type: [TeamMember],
        minCount: 5,
    },
    creationDate: {
        type: Date,
    },
});

Teams.schema = new SimpleSchema({
    team: {
        type: [Team],
    }
});