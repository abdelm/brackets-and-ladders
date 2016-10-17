//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import depedencies
import Home from './components/Home';
import Tournaments from '/client-server/collections/tournamentsCollection';
import Teams from '/client-server/collections/teamsCollection';

//Container: ViewTeam - for publishing and subscribing information on teams
export default HomeContainer = createContainer(() => {
    Meteor.subscribe('tournaments');
    Meteor.subscribe('teams');

    const currentUser = Meteor.userId();
    const tournamentsResult = Tournaments.find(
        {}
    ).fetch();
    //console.log(tournamentsResult);
    const teamsResult = Teams.find(
        {}
    ).fetch();

    //Passes needed props into the Home.js file
    return {
        currentUser,
        tournamentsResult,
        teamsResult,
    };
}, Home);