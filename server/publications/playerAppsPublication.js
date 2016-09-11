
// IMPORT: Package Dependencies
import { Meteor } from 'meteor/meteor';

// IMPORT: Collection(s)
import PlayerApplications from '../../client-server/collections/playerAppsCollection';



/*
*     Publications: Player Applications
*/

Meteor.publish('playerApplications', function playerApplicationsPublication() {
    return PlayerApplications.find({});
})
