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
            username: "",
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }

    componentDidMount(){
        Tracker.autorun(() => {
            let user = Meteor.users.findOne({_id: Meteor.userId()});
            if (typeof user == 'undefined') {
                this.username = 'User';
            } else {
                this.username = user.username;
                this.updateUsername(this.username);
            }
            //Check if username changes
            //console.log(this.username);
        });
    }

    updateUsername(userUsername){
        this.setState({username: userUsername});
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

    render(){
        //CSS Styles using React
        let navBarStyle = {
            background: 'White',
            borderRadius: "0px",
        }

        //Checks if a user is logged in and changes account buttons on the nav bar
        let accountButtons;
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
        } else if (this.state.username == "" || this.state.username == "User"){
            accountButtons = (
                <div className="right menu">
                    <div className="ui text centered inline loader item">Loading</div>
                    <div className="item">
                        <a className="ui button" onClick={this.handleLogout}>Logout</a>
                    </div>
                </div>
            );
        } else {
            accountButtons = (
                <div className="right menu">
                    <div className="ui simple dropdown item">
                        <i className="user icon large"></i>
                        <div className="text">Welcome, {this.username}!</div>
                        <div className="menu">
                            <a className="item" href="/user/manage-teams">Manage Teams</a>
                            <a className="item" href="/user">Settings</a>
                        </div>
                    </div>
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
                    Tournaments
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
                    Tournaments
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
                <div style={navBarStyle} className="ui large top menu">
                    <a className="header item" href="/">Brackets and Ladders</a>
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
