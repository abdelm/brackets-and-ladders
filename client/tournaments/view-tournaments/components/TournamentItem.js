//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Tournament Item - item that contains tournament information
export default class TournamentItem extends React.Component{
    constructor(){
        super();

    }

    componentDidMount(){
        $('.ui.accordion').accordion();
        $('.tournamentSignup')
            .popup({
                popup : $('.popup'),
                on : 'click'
            });
        $('.ui.dropdown').dropdown();
    }

    //Handler for when a user clicks on the "sign up for event" button. Adds and application to the tournament for the
    //tournament host to review.
    handleApplication(event){
        event.preventDefault();
        let user = Meteor.users.findOne({_id: this.props.currentUser});
        let username = user.username;
    }

    //Handles displaying the participating teams
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

    renderButton(){
        return(
            <div>
                <div className="ui primary button tournamentSignup" data-position="bottom center">Open Sign Ups!</div>
                <div className="ui popup transition hidden">
                    Select a team
                    <div className="ui selection dropdown">
                        <input name="gender" type="hidden"/>
                        <i className="dropdown icon"></i>
                        <div className="default text">Team</div>
                        <div className="menu">
                            <div className="item" data-value="1">Example team 1</div>
                            <div className="item" data-value="0">Example team 2</div>
                        </div>
                    </div>
                    <div className="ui divider"/>
                    <div className="ui primary button">Sign Up!</div>
                </div>
            </div>

        )
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

