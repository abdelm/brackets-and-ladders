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
                    <button className="ui column middle aligned primary button">Sign up for this event!</button>
                </div>
            </div>
        )
    }
}

