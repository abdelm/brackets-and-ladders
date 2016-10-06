
// IMPORT: Package Dependencies
import { Meteor } from 'meteor/meteor';

// IMPORT: Collection(s)
import TeamApplications from '../../client-server/collections/teamAppsCollection';



/*
*     Publications: Team Applications
*/

Meteor.publish('teamApplications', function teamApplicationsPublication() {
    return TeamApplications.find({});
})
