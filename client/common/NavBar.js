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
            signUpButton: true,
            loginButton: true,
            logoutButton: false,
        };
        this.toggleLoginButton = this.toggleLoginButton.bind(this);
        this.toggleSignUpButton = this.toggleSignUpButton.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleLoginButton(){

    }

    toggleSignUpButton(){

    }


    loginUser(){

    }

    logoutUser(){

    }

    handleLogout(){

    }

    render(){
        let loggedIn = true; //temporary, will set this to check if the user is actually logged in once account functionality has been added
        if (loggedIn){
            accountButtons = (
                <div className="right menu">
                    <div className="item">
                        <a className="ui button" href="/login">Log-in</a>
                    </div>
                    <div className="item">
                        <a className="ui primary button" href="/signup">Sign up</a>
                    </div>
                </div>
                );
        }

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