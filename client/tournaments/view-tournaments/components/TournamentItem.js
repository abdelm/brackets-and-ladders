//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Tournament Item - item that contains tournament information
export default class TournamentItem extends React.Component{
    constructor(){
        super();


        this.handleApplication = this.handleApplication.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.getUserTeams = this.getUserTeams.bind(this);
    }

    componentDidMount(){
        //JQuery
        $('.ui.accordion').accordion();
        $('.tournamentSignup')
            .popup({
                popup : $('.popup'),
                on : 'click'
            })
        ;
        $('.ui.dropdown').dropdown();
        $('.selection')
            .popup({
                position : 'right center',
                content  : 'You must select a team first!',
                on : 'manual',
            })
        ;
    }

    //Hides the "You must select a term first!" popup. Is called by handleApplication()
    hidePopup(){
        $('.selection')
            .popup('hide')
        ;
    }

    //Handler for when a user clicks on the "sign up for event" button. Adds and application to the tournament for the
    //tournament host to review.
    handleApplication(event){
        event.preventDefault();
        let user = Meteor.users.findOne({_id: this.props.currentUser});
        let username = user.username;
        let selectedTeam = $('#'+this.props.tournamentId)
            .dropdown('get text');
        //console.log(selectedTeam);
        //The popup trigger is manual and therefore needs to be close manually also. This block of JQuery checks if the popup is needed
        //if it is, it will trigger the popup, the popup will then remain visible for 2000ms or 2 seconds.
        if(selectedTeam == "Team"){
            $('.selection')
                .popup('show')
            ;
            setTimeout(this.hidePopup, 2000);
        } else {
            let tournamentId = this.props.tournamentId;
            let teamApplication = {
                "tournamentId" : tournamentId,
                "teamName" : selectedTeam,
                "username" : username,
            }

            // Create a new team application
            Meteor.call('team_application_create', teamApplication,
                (err) => {
                    if (err) {
                        console.log('Failed to apply for ' + this.props.tournamentName);
                        this.setState({error: err.reason});
                        console.log(err);
                    } else {
                        console.log('Successfully applied for ' + this.props.tournamentName);
                        FlowRouter.go("/tournaments"); // redirect to tournaments page
                    }
                }
            )
        }
    }

    //Handles displaying the participating teams, called in the render() method
    printTeams(){
        // Check if there are any teams in the tournament
        if(this.props.tournamentTeams != undefined){
            // Get list of teams
            const teams = this.props.tournamentTeams;
            return teams.map((team)=>{
                // Display each team
                return(<div className="item">{team}</div>);
            });
        } else {
            return (<div className="item">There are no teams in this tournament yet!</div>);
        }
    }

    //Renders the button depending on a user's relationship with the tournament, is called in the render() method
    renderButton(){
        const tournamentId = this.props.tournamentId;
        let userTeams = this.getUserTeams();
        let tournamentTeams = this.props.tournamentTeams;
        let applicantTeams = this.props.teamApplications;
        let existingTeam = false;
        let existingApplication = false;
        //Checks if a team that the user is a part of is already participating in the event
        if(userTeams.length > 0){
            if(tournamentTeams != undefined){
                tournamentTeams.forEach((team) => {
                    userTeams.forEach((userTeam) => {
                        if(team.teamName == userTeam.teamName){
                            existingTeam = true;
                        }
                    })
                })
            }
            //checks if a team that the user is a part of has already submitted an application
            applicantTeams.forEach((team2) => {
                if(team2.tournamentId == tournamentId){
                    userTeams.forEach((userTeam2) => {
                        //console.log(team2, userTeam2)
                        if(team2.teamName == userTeam2.teamName){
                            existingApplication = true;
                        }
                    })
                }
            })
            //console.log(userTeams);
            //console.log(applicantTeams);
            //console.log(existingApplication, existingTeam);

            //Render conditions for buttons based on whether there is an existingApplication or existingTeam
            if(existingApplication == false && existingTeam == false){
                return(
                    <div>
                        <div className="ui primary button tournamentSignup" data-position="bottom center">Sign Up Your Team</div>
                        <div className="ui popup transition hidden">
                            Select a team
                            <div id={this.props.tournamentId} className="ui selection dropdown">
                                <input name="team" type="hidden"/>
                                <div className="default text">Team</div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    {this.renderUserTeams()}
                                </div>
                            </div>
                            <div className="ui divider"/>
                            <div className="ui primary button" onClick={this.handleApplication}>Sign Up!</div>
                        </div>
                    </div>
                )
            } else if(existingApplication == true && existingTeam == false){
                return(
                    <div>
                        <div className="ui primary button disabled">You are part of a team that has already applied to this event.</div>
                    </div>
                )
            } else if(existingApplication == true && existingTeam == true){
                return(
                    <div>
                        <div className="ui primary button disabled">You are in a team particpating in this tournament!</div>
                    </div>
                )
            }
        //When the user is a part of no teams, this will show
        } else {
            return (
                <div>
                    <div className="ui primary button" disabled="true">You need to be in a team to sign up!</div>
                </div>
            )
        }
    }

    //Is called by the renderButton() method and gets the teams that the currently logged in user is part of
    getUserTeams(){
        let user = Meteor.users.findOne({_id: this.props.currentUser});
        let username = user.username;
        let teamsResult = this.props.teamsResult;
        let userTeams = new Array;
        teamsResult.forEach((team) => {
            team.members.forEach((member) => {
                if(member == username){
                    userTeams.push(team);
                }
            });
        });
        return userTeams;
    }

    //Renders user teams, is called by the renderButton() method
    renderUserTeams(){
        let userTeams = this.getUserTeams();
        let counter = -1;
        return userTeams.map((team) => {
            counter++;
            return(
                <div key={team._id} className="item" data-value={counter}>{team.teamName}</div>
            )
        })
    }

    render(){
        return(
            <div className="card four wide column">
                <div className="image">
                    <img src="/images/masthead.jpg"/>
                </div>
                <div className="content">
                    <h1 className="header">{this.props.tournamentName}</h1>
                </div>
                <div className="content">
                    <h5>Hosted by <i>{this.props.tournamentHost}</i> </h5>
                </div>
                <div className="content">
                    <div className="ui accordion">
                        <div className="title">
                            <i className="dropdown icon"/><b>Teams</b>
                        </div>
                        <div className="content">
                            <div className="ui list transition hidden">
                                {this.printTeams()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {this.renderButton()}
                </div>
            </div>
        )
    }
}
