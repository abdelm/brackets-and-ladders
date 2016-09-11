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

    renderTeams(){
        let teamsResult = this.props.teamsResult;
        if (teamsResult.length > 0) {
            return teamsResult.map((team) => {
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
            return (
                <p>There are no teams available at this time. <a href="/create-team">Create a team</a>!</p>
            );
        }
    }

    render(){
        return(
            <div className="ui cards grid">
                {this.renderTeams()}
            </div>
        )
    }
}
