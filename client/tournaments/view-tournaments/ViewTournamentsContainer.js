//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import dependencies
import TournamentList from './components/TournamentList';
import Tournaments from '/client-server/collections/tournamentsCollection';
import TeamApplications from '/client-server/collections/teamAppsCollection'
import Teams from '/client-server/collections/teamsCollection';

//Container: ViewTournaments - for publishing and subscribing information on tournaments 
export default ViewTournamentsContainer = createContainer(() => {
    Meteor.subscribe('tournaments');
    Meteor.subscribe('teamApplications');
    Meteor.subscribe('teams');

    const currentUser = Meteor.userId();
    const tournamentsResult = Tournaments.find(
        {}
    ).fetch();
    //console.log(tournamentsResult);
    const teamAppsResult = TeamApplications.find(
        {}
    ).fetch();
    const teamsResult = Teams.find(
        {}
    ).fetch();


    return {
        currentUser,
        tournamentsResult,
        teamAppsResult,
        teamsResult,
    };
}, TournamentList);