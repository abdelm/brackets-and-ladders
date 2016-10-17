//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Tournament Item - item that contains tournament information
export default class TournamentItem extends React.Component{
    constructor(){
        super();

        this.printTeams = this.printTeams.bind(this);
    }

    componentDidMount(){
        $('.ui.accordion').accordion();

        $('.hostIcon').popup();
        $('.participatingIcon').popup();
    }

    //Handles displaying the teams of the tournament
    printTeams(){
        if(this.props.tournamentTeams != undefined){
            const teams = this.props.tournamentTeams;
            return teams.map((team)=>{
                return(<div key={team._id} className="item">{team}</div>);
            });
        } else {
            return (<div className="item">There are no teams in this tournament yet!</div>);
        }
    }

    render(){

        //Checks if user is participating or the owner of the tournament
        let username = this.props.username;
        let host = this.props.tournamentHost;
        let tournamentTeams = this.props.tournamentTeams;
        let userTeams = this.props.userTeams;
        let isUserParticipating = false;
        let hostIcon;
        let participatingIcon;


        if(host == username) {
            hostIcon = (
                <div className="ui icon hostIcon" data-offset="-7" data-content="You are the owner of this tournament" data-variation="inverted">
                    <i className="large setting icon"/>
                </div>
            )
        }

        //for each loop in members and check if any member usernames match current username
        if (typeof tournamentTeams != 'undefined' && typeof userTeams != 'undefined') {
            tournamentTeams.forEach((tournamentTeam) => {
                userTeams.forEach((userTeam) => {
                    if(tournamentTeam.tournamentName == userTeams.tournamentName){
                        isUserParticipating = true;
                    }
                });
            });
        }

        if(isUserParticipating){
            participatingIcon = (
                <div className="ui icon participatingIcon" data-offset="-7" data-content="You are participating in this tournament" data-variation="inverted">
                    <i className="large users icon"/>
                </div>
            )
        }

        return(
            <div className="ui container segments">
                <div className="ui blue inverted top attached segment">
                    <div className="ui grid three column row">
                        <div className="eleven wide left aligned column">
                            <h3 className="ui inverted left aligned header">
                                {this.props.tournamentName}
                            </h3>
                        </div>
                        <div className="two wide right aligned column">
                            {hostIcon}
                        </div>
                        <div className="two wide column">
                            {participatingIcon}
                        </div>
                    </div>
                </div>
                <div className="ui attached left aligned segment">
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
            </div>
        )
    }
}
