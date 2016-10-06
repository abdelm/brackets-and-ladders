//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies
import TournamentItem from './TournamentItem';

//Component: TournamentList - Lists tournaments
export default class TournamentList extends React.Component{
    constructor(){
        super()
    }

    //Is called by the renderer for this component. Renders each tournament and passes appropriate props to each.
    renderTournaments(){
        let tournamentsResult = this.props.tournamentsResult;
        if (tournamentsResult.length > 0) {
            return tournamentsResult.map((tournament) => {
                return (
                    <TournamentItem
                        key={tournament._id}
                        tournamentId={tournament._id}
                        tournamentName={tournament.tournamentName}
                        tournamentHost={tournament.tournamentHost}
                        tournamentGame={tournament.tournamentGame}
                        dateCreated={tournament.dateCreated}
                        tournamentTeams={tournament.teams}
                        currentUser={this.props.currentUser}
                        teamApplications={this.props.teamAppsResult}
                        teamsResult={this.props.teamsResult}
                    />
                )
            });
        } else {
            return (
                <p>There are no tournaments available at this team. <a href="/tournaments/create-tournament">Create a tournament</a>!</p>
            );
        }
    }

    render(){
        return (
            <div className="ui cards centered grid">
                {this.renderTournaments()}
            </div>
        )
    }
}