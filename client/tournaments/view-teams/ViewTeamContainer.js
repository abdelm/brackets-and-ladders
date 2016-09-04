//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import depedencies
import TeamList from './components/TeamList';
import Teams from '../../../client-server/collections/teamsCollection';

//Container: ViewTeam - for publishing and subscribing information on teams
export default ViewTeamContainer = createContainer(() => {

    Meteor.subscribe('teams');

    //For when we want to implement a view of what teams a player is a part of
    //const currentUser = Meteor.userId();
    
    const teamsResult = Teams.find(
        //Same as previous comment
        //{ "member" : Meteor.userId() }
        {}
    ).fetch();

    return {
        //currentUser,
        teamsResult
    };

}, TeamList);