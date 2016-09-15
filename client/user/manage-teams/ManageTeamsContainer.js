//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import depedencies
import ManageTeamsMenu from './components/ManageTeamsMenu';
import Teams from '/client-server/collections/teamsCollection';
import PlayerApplications from '/client-server/collections/playerAppsCollection';

//Container: Manage Teams - for publishing and subscribing information on teams and corresponding applications
export default ManageTeamsContainer = createContainer(() => {

    Meteor.subscribe('teams');
    Meteor.subscribe('playerApplications');

    const currentUserId = Meteor.userId();

    const teamsResult = Teams.find(
        {}
    ).fetch();

    const playerAppsResult = PlayerApplications.find(
        {}
    ).fetch();

    return {
        currentUserId,
        teamsResult,
        playerAppsResult,
    };

}, ManageTeamsMenu);