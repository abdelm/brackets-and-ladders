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
        return(
            <div className="ui container segments">
                <div className="ui blue inverted top attached segment">
                    <div className="ui grid two column row">
                        <div className="eleven wide left aligned column">
                            <h3 className="ui inverted left aligned header">
                                {this.props.tournamentName}
                            </h3>
                        </div>
                        <div className="five wide right aligned column">
                            <i className="large setting icon"/>
                            <i className="large users icon"/>
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
