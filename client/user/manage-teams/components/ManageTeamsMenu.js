//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies
import TeamMenu from './TeamMenu';

//Component: Manage Teams Menu - menu for managing Teams
export default class ManageTeamsMenu extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
        };
        this.updateUsername = this.updateUsername.bind(this);   
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.getUserTeams = this.getUserTeams.bind(this);
        this.renderTeamsTab = this.renderTeamsTab.bind(this);
    }

    //Tracker function loaded as component is mounted. This is to refresh the component if the login state changes
    //this is especially useful because FlowRouter renders the layout before any calls to the database are made.
    //This set of code will reload the component once Meteor calls the database AFTER FlowRouter renders the layout.
    //There is a fix for this using FlowRouter instead of a Tracker function but this will suffice for now.
    componentDidMount(){
        Tracker.autorun(() => {
            let user = Meteor.users.findOne({_id: this.props.currentUserId});
            if (typeof user == 'undefined') {
                this.username = 'User';
            } else {
                this.username = user.username;
                this.updateUsername(this.username);
            }
        });
    }
    
    //Changes username based on component update through the Tracker Function in componentDidMount().
    updateUsername(userUsername){
        this.setState({username: userUsername});
    }   

    //Is called by renderTeamsTab() and renderTeamsContent(). This method gets the teams that are associated with the currently logged in user.
    getUserTeams(){
        let teamsResult = this.props.teamsResult;
        let userTeams = new Array;
        teamsResult.forEach((team) => {
            team.members.forEach((member) => {
                if(member == this.username){
                    userTeams.push(team);
                }
            });
        });
        return userTeams;
    }

    //Renders buttons for selecting teams.
    renderTeamsTab(){
        let userTeams = this.getUserTeams();
        if (userTeams.length > 0) {
            return userTeams.map((team) => {
                return(
                    <button key={team._id} className="ui column two wide large circular blue button" onClick={(event) => this.handleTeamSelect(team._id, event)}>{team.teamName}</button>
                )
            });
        } else {
            return(
                <p>You aren't in any teams</p>
            )
        }
    }

    handleTeamSelect(teamId, event){
        event.preventDefault();
        this.renderTeamsContent(teamId);
    }

    //Is called by the handleTeamSelect handler and renders the TeamMenu component and passes some props.
    renderTeamsContent(teamId){
        //Check if team changed and correct team is selected
        //console.log(teamId);
        let userTeams = this.getUserTeams();
        let playerAppsResult = this.props.playerAppsResult;
        if(userTeams.length > 0){
            userTeams.map((team) => {
                if(team._id == teamId){
                    ReactDOM.render(
                        <TeamMenu
                            key={team._id}
                            teamId={team._id}
                            teamName={team.teamName}
                            members={team.members}
                            leaders={team.leaders}
                            dateCreated={team.dateCreated}
                            playerApplications={playerAppsResult}
                        />
                    , document.getElementById('TeamMenu'));
                }
            })
        } else {
            ReactDOM.render(
                <div>You haven't selected a team</div>
            , document.getElementById('TeamMenu'))
        }
    }

    render(){
        return(
            <div className="ui segment container centered grid">
                <div className="row"/>
                <div className="ui stackable row equal width grid">
                    {this.renderTeamsTab()}
                </div>
                <div className="row"/>
                <div className="row">
                    <h4 className="ui horizontal divider header">
                        Select a Team
                    </h4>
                </div>
                <div className="row" id="TeamMenu">
                </div>
            </div>
        )
    }
}