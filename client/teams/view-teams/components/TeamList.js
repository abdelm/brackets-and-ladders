//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies
import TeamCard from './TeamCard';

//Component: TeamList - Lists teams
export default class TeamList extends React.Component{
    constructor(){
        super()
    }

    //Is called by the renderer for this component. Renders each team and passes appropriate props to each.
    renderTeams(){
        // Get list of teams and loop through them
        let teamsResult = this.props.teamsResult;
        if (teamsResult.length > 0) {
            return teamsResult.map((team) => {
                // Display each team
                return (
                    <TeamCard
                        key={team._id}
                        teamName={team.teamName}
                        leaders={team.leaders}
                        members={team.members}
                        dateCreated={team.dateCreated}
                        applicantId={this.props.currentUser}
                        playerApplications={this.props.playerAppsResult}
                    />
                )
            });
        } else {
            // Print error message if no teams are available
            return (
                <p>There are no teams available at this time. <a href="/teams/create-team">Create a team</a>!</p>
            );
        }
    }

    render(){
        return(
            <div className="ui cards centered grid">
                {this.renderTeams()}
            </div>
        )
    }
}
