
//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Component: Manage Tournaments Menu - menu for managing Tournaments
export default class ManageTournamentsMenu extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
        };
        this.updateUsername = this.updateUsername.bind(this);
    }

    //Tracker function loaded as component is mounted. This is to refresh the component if the login state changes
    //this is especially useful because FlowRouter renders the layout before any calls to the database are made.
    //This set of code will reload the component once Meteor calls the database AFTER FlowRouter renders the layout.
    //There is a fix for this using FlowRouter instead of a Tracker function but this will suffice for now.
    componentDidMount(){
        Tracker.autorun(() => {
            let user = Meteor.users.findOne({_id: this.props.currentUserId});
            if (typeof user == 'undefined') {
                this.username = 'User';
            } else {
                this.username = user.username;
                this.updateUsername(this.username);
            }
        });
    }

    //Changes username based on component update through the Tracker Function in componentDidMount().
    updateUsername(userUsername){
        this.setState({username: userUsername});
    }

    //This method gets the tournaments hosted by the current user
    getUserTournaments(){
        let tournamentsResult = this.props.tournamentsResult;
        let userTournaments = new Array;
        tournamentsResult.forEach((tournament) => {
                if(tournament.tournamentHost == this.username){
                    userTournaments.push(tournament);
                }
        });
        return userTournaments;
    }

    //Renders Tournaments hosted by the current user (they are buttons)
    renderTournaments(){
        let userTournaments = this.getUserTournaments();
        console.log(userTournaments);
        if (userTournaments.length > 0){
            return userTournaments.map((tournament) => {
                return(
                    <div key={tournament._id} className="ui segment grid two column row">
                        <div className="left floated column">
                            <div><b>{tournament.tournamentName}</b></div>
                            <div>Game: <i>{tournament.tournamentGame}</i>, Date created: {tournament.dateCreated.toString()}</div>
                        </div>
                        <div className="right floated right aligned column">
                            <div className="ui green button">Update</div>
                            <div className="ui button">Review Applications</div>
                            <div className="ui red button">Close</div>
                        </div>
                    </div>
                )
            })
        } else {
            return(
                <div className="ui segment">You aren't hosting any tournaments</div>
            )
        }
    }

    render(){
        return(
                <div className="ui container segments">
                    <div className="ui blue inverted segment">
                        <h1>Manage Tournaments</h1>
                    </div>
                    {this.renderTournaments()}
                </div>
        )
    }
}

