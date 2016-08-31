//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Component: NavBar - Navigation Bar in the header of all pages
export default class NavBar extends React.Component{
    render(){
        return(
            <div className="ui menu">
                <div className="header item">Brackets and Ladders</div>
                <a className="active item">
                    Home
                </a>
                <a className="item">
                    Tournaments
                </a>
                <a className="item">
                    About
                </a>
                <div className="right menu item">
                    <a className="ui primary button">Log-in</a>
                </div>
            </div>
        )
    }
}