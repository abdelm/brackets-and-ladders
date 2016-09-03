//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Component: NavBar - Navigation Bar in the header of all pages
export default class NavBar extends React.Component{
    constructor(){
        super()
        this.state = {
            accountButtons: false,
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleAccountButtons(){
        this.setState({accountButtons: !this.state.accountButtons});
    }

    handleLogout(event){
        event.preventDefault();
        Meteor.logout(
            (err) => {
                if (err) {
                    console.log('Logout Failure.');
                    console.log(err);
                } else {
                    console.log('Logout Success.');
                }
            }
        );
        this.toggleAccountButtons();
    }

    render(){
        //Checks if a user is logged in and changes account buttons on the nav bar
        let accountButtons;
        if (this.state.accountButtons === true || !Meteor.user()){
            accountButtons = (
                <div className="right menu">
                    <div className="item">
                        <a className="ui button" href="/login">Login</a>
                    </div>
                    <div className="item">
                        <a className="ui primary button" href="/register">Sign up</a>
                    </div>
                </div>
            );
        } else {
            accountButtons = (
                <div className="right menu">
                    <div className="item">
                        <a className="ui button" onClick={this.handleLogout}>Logout</a>
                    </div>
                </div>
            );
        };

        return(
            <div className="ui menu">
                <div className="header item">Brackets and Ladders</div>
                <a className="active item" href="/">
                    Home
                </a>
                <a className="item">
                    Tournaments
                </a>
                <a className="item" href="/about">
                    About
                </a>
                { accountButtons }
            </div>
        )
    }
}