//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Card - Card that displays team information
export default class TeamCard extends React.Component{
    constructor(){
        super();
        this.state = {
            buttonUsed : false,
        }
        this.toggleButton = this.toggleButton.bind(this);
        this.handleApplication = this.handleApplication.bind(this);
    }

    componentDidMount(){
        $('.ui.accordion').accordion();
    }

    toggleButton(){
        this.setState({buttonUsed: !this.state.buttonUsed})
    }

    handleApplication(event){
        event.preventDefault();
        const applicantId = this.props.applicantId;
        let user = Meteor.users.findOne({_id: applicantId});
        let username = user.username;
        const teamName = this.props.teamName;
        let playerApplication = {
            "teamName" : teamName,
            "username" : username,
            "applicantId" : applicantId
        }

        Meteor.call('player_application_create', playerApplication,
            (err) => {
                if (err) {
                    console.log('Failed to apply for ' + teamName);
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    console.log('Successfully applied for ' + teamName);
                    FlowRouter.go("/view-teams");
                }
            }
        )

        toggleButton();
    }
    
    render(){
        //Checks if player is already a part of the team or if they already have sent an application
        let members = this.props.members;
        let teamName = this.props.teamName;
        let playerApplications = this.props.playerApplications;
        let user = Meteor.users.findOne({_id: this.props.applicantId});
        let username = user.username;
        let existingMember, existingApplicant = false;
        let applicationButton;

        //for each loop in members and check if any member usernames match current username
        members.map((member) => {
            if (member == username){
                existingMember = true;
            }
        });

        //search collection for application with same userID and teamName
        playerApplications.map((playerApplication) => {
            if (playerApplication.username == username && playerApplication.teamName == teamName){
                existingApplicant = true;
            }
        })

        if (existingMember == true){
            applicationButton = (
                <button className="ui column middle aligned button" disabled="true">You're already a member of this team</button>
            )
        } else if (existingApplicant == true){
            applicationButton = (
                <button className="ui column middle aligned button" disabled="true">You have a pending application for this team</button>
            )
        } else {
            applicationButton = (
                <button className="ui column middle aligned primary button" onClick={this.handleApplication}>Apply to Join</button>
            )
        }

        return(
            <div className="card four wide column">
                <div className="content">
                    <h1 className="header">Team - {this.props.teamName}</h1>
                </div>
                <div className="content">
                    <h5>Created {this.props.dateCreated.toString()}</h5>
                </div>
                <div className="content">
                    <div className="content"><b>Leader:</b> 
                        <div>{this.props.leaders.toString()}</div>
                    </div>
                    <div className="ui accordion">
                        <div className="title">
                            <i className="dropdown icon"/><b>Members</b>
                        </div>
                        <div className="content">
                            <div className="ui list transition hidden">
                                <div className="item">{this.props.members.toString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui content grid">
                    {applicationButton}
                </div>
            </div>
        )
    }
}
