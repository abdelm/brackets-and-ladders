//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Menu - Menu for a specific team selected in the manage teams Menu
export default class TeamMenu extends React.Component{
    constructor(){
        super()
    }

    render(){
        //todo: make it a split menu
        //ui two wide column secondary vertical pointing menu
        return(
            <div className="ui two column row">
                <div className="column">
                    <a className="item active">
                        Overview
                    </a>
                    <a className="item">{/*there needs to be a condition here that prevents applications from showing if they aren't a team leader*/}
                        Applications
                    </a>
                </div>
                <div className="column">
                    Example Text. YOLO!
                </div>
            </div>
        )
    }
}