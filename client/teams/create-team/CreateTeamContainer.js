//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import depedencies
import CreateTeamForm from './components/CreateTeamForm';

//Container: CreateTeam - for publishing and subscribing information on teams
export default CreateTeamContainer = createContainer(() => {
    const currentUserId = Meteor.userId();
    
    return{
        currentUserId,
    };

}, CreateTeamForm);