//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Depdendencies

//Component: CreateTournamentForm - Form used to create a tournament

export default class CreateTournamentForm extends React.Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){

    }

    render(){
        return(
            <div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Tournament Name</label>
                        <input name="tournamentName" placeholder="Tournament Name" type="text" ref="tournamentName" />
                    </div>
                    <div className="field">
                        <label>Game (if not applicable, enter "General")</label>
                        <div className="field">
                            <input name="game" placeholder="E.g. League of Legends" type="text" ref="game" />
                        </div>
                    </div>
                    <button className="ui button primary" type="submit">Create Tournament</button>
                </form>
            </div>
        )
    }
}