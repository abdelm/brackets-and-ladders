//Import packages
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Import depedencies
import CreateTournamentForm from './components/CreateTournamentForm';

//Container: CreateTournament - User id is required for submission.
export default CreateTeamContainer = createContainer(() => {
    const currentUserId = Meteor.userId();
    
    return{
        currentUserId,
    };

}, CreateTournamentForm);