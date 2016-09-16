//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Menu - Menu for a specific team selected in the manage teams Menu
export default class TeamMenu extends React.Component{
    constructor(){
        super()
    }

    didComponentMount(){
        $('.menu .item').tab();
    }

    render(){
        return(
            <div className="ui stretched row two column grid">
                <div className="ui top attached blue segment row centered">
                    <h1 className="header column">Team Name</h1>
                </div>
                <div className="ui attached segment row">
                    <div className="two wide column">
                        <div className="ui vertical tabular menu">
                            <a className="active blue item" data-tab="first">
                                Overview
                            </a>
                            <a className="blue item" data-tab="second">
                                Applications
                            </a>
                        </div>
                    </div>
                    <div className="right floated twelve wide column">
                        <div className="ui active tab stretched" data-tab="first">
                            <h2 className="ui top attached blue segment header">Overview</h2>
                            <div className="ui attached segment">
                                <p>Leaders: Player 1</p>
                                <p>Members: Players 1, 2, 3, 4, and 5</p>
                            </div>
                        </div>
                        <div className="ui tab stretched" data-tab="second">
                            <h2 className="ui top attached blue segment header">Applications</h2>
                            <div className="ui attached segment">
                                <p>Hello 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}