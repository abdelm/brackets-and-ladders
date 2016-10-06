//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Tournament Item - item that contains tournament information
export default class TournamentItem extends React.Component{
    constructor(){
        super();


        this.handleApplication = this.handleApplication.bind(this);
    }

    componentDidMount(){
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
                on : 'manual'
            })
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
        if(selectedTeam == "Team"){
            $('.selection')
                .popup('show')
            ;
        } else {
            let tournamentId = this.props.tournamentId;
            let teamApplication = {
                "tournamentId" : tournamentId,
                "teamName" : selectedTeam,
                "username" : username,
            }

            Meteor.call('team_application_create', teamApplication,
                (err) => {
                    if (err) {
                        console.log('Failed to apply for ' + this.props.tournamentName);
                        this.setState({error: err.reason});
                        console.log(err);
                    } else {
                        console.log('Successfully applied for ' + this.props.tournamentName);
                        FlowRouter.go("/tournaments");
                    }
                }
            )
        }
    }

    //Handles displaying the participating teams, called in the render() method
    printTeams(){
        if(this.props.TournamentTeams != undefined){
            const teams = this.props.TournamentTeams;
            return teams.map((team)=>{
                return(<div className="item">{team}</div>);
            });
        } else {
            return (<div className="item">There are no teams in this tournament yet!</div>);
        }
    }

    //Renders the button depending on a user's relationship with the tournament, is called in the render() method
    renderButton(){
        return(
            <div>
                <div className="ui primary button tournamentSignup" data-position="bottom center">Open Sign Ups!</div>
                <div className="ui popup transition hidden">
                    Select a team
                    <div id={this.props.tournamentId} className="ui selection dropdown">
                        <input name="team" type="hidden"/>
                        <i className="dropdown icon"></i>
                        <div className="default text">Team</div>
                        <div className="menu">
                            {this.renderUserTeams()}
                        </div>
                    </div>
                    <div className="ui divider"/>
                    <div className="ui primary button" onClick={this.handleApplication}>Sign Up!</div>
                </div>
            </div>
        )
    }

    //Renders user teams, is called by the renderButton() method
    renderUserTeams(){
        let teamsResult = this.props.teamsResult;
        let user = Meteor.users.findOne({_id: this.props.currentUser});
        let username = user.username;
        let userTeams = new Array;

        teamsResult.forEach((team) => {
            team.members.forEach((member) => {
                if(member == username){
                    userTeams.push(team);
                }
            });
        });
        
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

