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

    handleSubmit(event){
        event.preventDefault();
        //Get field values, specified by 'ref' attribute
        const name = ReactDOM.findDOMNode(this.refs.tournamentName).value;
        const game = ReactDOM.findDOMNode(this.refs.game).value;
        //Get user
        const user = Meteor.users.findOne({_id: this.props.currentUserId})
        //Pass values into an object for usage in validation method
        const tournament = {
            "tournamentName" : name,
            "tournamentHost" : user.username,
            "tournamentGame" : game
        }
        //Run validation and server method to write information to the tournament collection
        if(name !='' && game !=''){
            Meteor.call('tournament_create', tournament,
                (err) => {
                    if (err) {
                        console.log('Failed to create Tournament.');
                        console.log(err);
                        ReactDOM.render(
                            <div className="ui top attached error message">
                                <i className="icon warning"></i>
                                "Oops! Something broke! Please refresh the page and try again."
                            </div>
                        , document.getElementById("warningMessage"));
                    } else {
                        console.log('Successfully created Tournament.');
                        //Clears error message
                        ReactDOM.render(
                            <div />
                        , document.getElementById("warningMessage"));
                        //Disables submit button and gives states success
                        ReactDOM.render(
                            <button className="ui green button disabled">Tournament Created!</button>
                        , document.getElementById("submitButton"));
                        
                        //Redirects to tournaments page
                        //FlowRouter.go("/tournaments");
                    }
                }
            );
        } else {
            ReactDOM.render(
                <div className="ui top attached error message">
                    <i className="icon warning"></i>
                    "Fields cannot be left empty. Please try again."
                </div>
            , document.getElementById("warningMessage"));
        }
    }

    render(){
        return(
            <div>
                <div id="warningMessage" />
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
                    <div id="submitButton">
                        <button className="ui button primary" type="submit">Create Tournament</button>
                    </div>
                </form>
            </div>
        )
    }
}