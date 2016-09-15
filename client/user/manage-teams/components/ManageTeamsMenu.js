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
            loadedTeam: "",
        };
        this.updateUsername = this.updateUsername.bind(this);  
        this.updateLoadedTeam = this.updateLoadedTeam.bind(this);  
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.getUserTeams = this.getUserTeams.bind(this);
        this.renderTeamsTab = this.renderTeamsTab.bind(this);
        this.renderTeamsContent = this.renderTeamsContent.bind(this);
    }

    componentDidMount(){
        $('.tabular.menu .item').tab();
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

    updateUsername(userUsername){
        this.setState({username: userUsername});
    }   

    updateLoadedTeam(teamId){
        this.setState({loadedTeam: teamId});
    } 

    handleTeamSelect(teamId){
        this.renderTeamsContent(teamId);
    }

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

    renderTeamsTab(){
        let userTeams = this.getUserTeams();
        if (userTeams.length > 0) {
            return userTeams.map((team) => {
                return(
                    <button key={team._id} className="ui column two wide large circular button" onClick={this.handleTeamSelect(team._id)}>{team.teamName}</button>
                )
            });
        } else {
            return(
                <p>You aren't in any teams</p>
            )
        }
    }

    renderTeamsContent(teamId){
        let userTeams = this.getUserTeams();
        let playerAppsResult = this.props.playerAppsResult;
        if(userTeams.length > 0){
            userTeams.map((team) => {
                if(team._id == teamId){
                    return(
                        <TeamMenu>
                            key={team._id}
                            team={team}
                        </TeamMenu>
                    )
                }
            })
        } else {
            return <div/>
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
                <div className="row">
                    <TeamMenu />
                </div>
            </div>
        )
    }
}