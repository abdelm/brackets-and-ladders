
//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies
import ApplicationItem from './ApplicationItem';

//Component: Manage Tournaments Menu - menu for managing Tournaments
export default class ManageTournamentsMenu extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
        };
        this.updateUsername = this.updateUsername.bind(this);
        this.renderTeamsList = this.renderTeamsList.bind(this);
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
        $('.ui.modal')
            .modal()
        ;
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
        if (userTournaments.length > 0){
            return userTournaments.map((tournament) => {
                return(
                    <div key={tournament._id} className="ui segment grid">
                        <div className="two column row">
                            <div className="left floated column">
                                <div><b>{tournament.tournamentName}</b></div>
                                <div>Game: <i>{tournament.tournamentGame}</i>, Date created: {tournament.dateCreated.toString()}</div>
                            </div>
                            <div className="right floated right aligned column">
                                <div className="ui green disabled button">Update</div>
                                <div className="ui button" onClick={(event) => this.renderManageTeams(tournament._id, event)}>Manage Teams</div>
                                <div className="ui red button" onClick={(event) => this.renderCloseModal(tournament._id, event)}>Close</div>
                            </div>
                        </div>
                        <div id={tournament._id} className="ui modal">
                            <div className="ui two column padded grid">
                                <div className="left floated column">
                                    <div className="ui list">
                                        <h5 className="item">Teams:</h5>
                                        {this.renderTeamsList(tournament.teams)}
                                    </div>
                                </div>
                                <div className="ui vertical divider"/>
                                <div className="right floated column">
                                    <div className="ui segments">
                                        <div className="ui segment">
                                            <h2>Applications</h2>
                                        </div>
                                        <div className="ui segments">
                                            {this.renderPendingApplications(tournament)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id={"close"+tournament._id} className="ui modal">
                            <div className="ui padded centered grid">
                                <div className="row">
                                    <h3>Are you sure?</h3>
                                </div>
                                <div className="row">This action will delete this tournament permanently and cannot be undone!</div>
                                <div className="row">
                                    <div className="ui green button" onClick={(event) => this.closeTournament(tournament._id, event)}>Yes, close this tournament</div>
                                    <div className="ui red button" onClick={(event) => this.hideCloseModal(tournament._id, event)}>No</div>
                                </div>
                            </div>
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

    //Modal trigger for rendering manage teams, called by renderTournaments()
    renderManageTeams(tournamentId, event){
        event.preventDefault();
        $("#"+tournamentId).modal('show');
    }

    renderTeamsList(teams){
        if(teams != undefined){
            return teams.map((team) => {
                return(
                    <div className="item">{team}</div>
                )
            })
        } else{
            return(
                <div>There are no teams participating in this tournament.</div>
            )
        }
    }

    //Renders component ApplicationItem, called from renderTournaments() method
    renderPendingApplications(tournament){
        const tournamentId = tournament._id;
        let teamApplications = this.getTournamentApplications(tournamentId);
        let pendingApplications = new Array;
        if(teamApplications.length > 0){
            teamApplications.forEach((application) => {
                if(application.status == "Pending"){
                    pendingApplications.push(application);
                }
            });
        }
        //console.log("thisisatest", pendingApplications);
        if(pendingApplications.length > 0){
            return pendingApplications.map((application) => {
                return(
                    <ApplicationItem
                    key={application._id}
                    applicationId={application._id}
                    applicantName={application.username}
                    applicantTeamName={application.teamName}
                    applicationStatus={application.status}
                    tournamentId={tournamentId}
                    />
                )
            });
        } else{
            return(
                <div className="ui segment">There are currently no pending applications for this tournament.</div>
            )
        }
    }

    //Gets applications relevant to the tournament
    getTournamentApplications(tournamentId){
        let teamAppsResult = this.props.teamAppsResult;
        let teamApplications = new Array;
        teamAppsResult.forEach((application) => {
            if(application.tournamentId == tournamentId){
                teamApplications.push(application);
            }
        });
        return teamApplications;
    }

    //Renders modal that displays to double check the host's decision to close the tournament
    renderCloseModal(tournamentId, event){
        event.preventDefault();
        $("#close"+tournamentId).modal('show');
    }

    hideCloseModal(tournamentId, event){
        event.preventDefault();
        $("#close"+tournamentId).modal('hide');
    }

    //Deletes the tournament
    closeTournament(tournamentId, event){
        event.preventDefault();
        let tournamentParams = {
            "tournamentId": tournamentId
        }
        Meteor.call('tournament_remove', tournamentParams,
            (err) => {
                if (err) {
                    console.log('Failed to remove tournament');
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    console.log('Successfully removed tournament');
                }
            }
        )
        this.hideCloseModal(tournamentId, event);
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

