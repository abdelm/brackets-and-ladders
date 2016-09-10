
// IMPORT: Package Dependencies
import { Meteor } from 'meteor/meteor';

// IMPORT: Collection(s)
import Teams from '../../client-server/collections/teamsCollection';



/*
*     Publications: Teams
*/

Meteor.publish('teams', function teamsPublication() {
    return Teams.find({});
})
