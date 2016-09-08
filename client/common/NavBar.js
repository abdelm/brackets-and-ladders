//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mongo } from 'meteor/mongo';

//Import Dependencies

//Component: NavBar - Navigation Bar in the header of all pages
export default class NavBar extends React.Component{
    constructor(){
        super()
        this.state = {
            accountButtons: false,
        };
        this.handleLogout = this.handleLogout.bind(this);

        let user = Meteor.users.findOne({_id: Meteor.userId()});
        if (typeof user == 'undefined') {
            this.username = 'User';
        } else {
            this.username = user['username'];
        }
    }

    componentDidMount(){
        Meteor.subscribe('users');
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
                    FlowRouter.go("/login");
                }
            }
        );
        this.toggleAccountButtons();
    }

    findCurrentUser(){
        //use this method to find users instead of using using an object in the render
    }

    render(){
        //CSS Styles using React
        let navBarStyle = {
            background: '#212121',
            borderRadius: "0px",
        }

        //Checks if a user is logged in and changes account buttons on the nav bar
        let accountButtons;
        this.findCurrentUser();
        if (!Meteor.userId()){
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
                    <a className="ui simple dropdown item">
                        <i className="user icon large"></i>
                        <div className="text">Welcome, {this.username}!</div>
                        <div className="menu">
                            <div className="item">Item 1</div>
                            <div className="item">Item 2</div>
                            <div className="item">Item 3</div>
                        </div>
                    </a>
                    <div className="item">
                        <a className="ui button" onClick={this.handleLogout}>Logout</a>
                    </div>
                </div>
            );
        };


        let tournamentDropdown;
        if (this.state.accountButtons === true || !Meteor.userId()){
            tournamentDropdown = (
                <div className="ui simple dropdown item">
                    <div className="text">Tournaments</div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <a className="item" href="/tournaments/view">
                            View Tournaments
                        </a>
                    </div>
                </div>
            )
        } else {
            tournamentDropdown = (
                <div className="ui simple dropdown item">
                    <div className="text">Tournaments</div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <a className="item" href="/tournaments/view">
                            View Tournaments
                        </a>
                        <a className="item" href="/create-team">
                            Create Team
                        </a>
                        <a className="item" href="/view-teams">
                            View Teams
                        </a>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <div style={navBarStyle} className="ui large top menu inverted">
                    <div className="header item">Brackets and Ladders</div>
                    <a className="item" href="/">
                        Home
                    </a>
                    { tournamentDropdown }
                    <a className="item" href="/about">
                        About
                    </a>
                    { accountButtons }
                </div>
            </div>
        )
    }
}
