//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import depedencies
import ManageTournamentsMenu from './components/ManageTournamentsMenu';
import Teams from '/client-server/collections/teamsCollection';
import Tournaments from '/client-server/collections/tournamentsCollection'
import TeamApplications from '/client-server/collections/teamAppsCollection';

//Container: Manage Tournaments - for publishing and subscribing information on tournaments and corresponding applications
export default ManageTournamentsContainer = createContainer(() => {

    Meteor.subscribe('teams');
    Meteor.subscribe('tournaments');
    Meteor.subscribe('TeamApplications');

    const currentUserId = Meteor.userId();

    const teamsResult = Teams.find(
        {}
    ).fetch();

    const tournamentsResult = Tournaments.find(
        {}
    ).fetch();

    const teamAppsResult = TeamApplications.find(
        {}
    ).fetch();

    return {
        currentUserId,
        teamsResult,
        tournamentsResult,
        teamAppsResult,
    };

}, ManageTournamentsMenu);