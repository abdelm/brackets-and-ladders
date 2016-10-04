
// IMPORT: Package Dependencies
import { Meteor } from 'meteor/meteor';

// IMPORT: Collection(s)
import Tournaments from '../../client-server/collections/tournamentsCollection';



/*
*     Publications: Tournaments
*/

Meteor.publish('tournaments', function tournamentsPublication() {
    return Tournaments.find({});
})
