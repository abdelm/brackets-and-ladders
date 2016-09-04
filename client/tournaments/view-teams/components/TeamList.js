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
        return teamsResult.map((team) => {
            return (
                <TeamCard
                    key={team._id}
                    teamName={team.teamName}
                    leaders={team.leaders}
                    leader={team.members.leader}
                    member2={team.members.member2}
                    member3={team.members.member3}
                    member4={team.members.member4}
                    member5={team.members.member5}
                    dateCreated={team.dateCreated}
                />
            )
        })
    }

    render(){
        return(
            <div>
                {this.renderTeams()}
            </div>
        )
    }
}
