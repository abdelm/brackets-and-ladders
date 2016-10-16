//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mongo } from 'meteor/mongo';

//Import Dependencies
import TournamentItem from './TournamentItem';

//Component: Overview - Home page when logged in
export default class Overview extends React.Component{
    constructor(){
    	super();
    	this.state = {
            username: "",
        };
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
                        teamsResult={this.props.teamsResult}/>
                )
            });
        } else {
            return (
                <p>You are not entered into any tournaments.</p>
            );
        }
    }

    render(){

    	let headerStyle = {
            fontSize: '50px',
            fontWeight: '300',
        }


        return(
        	<div className="ui column centered grid">
				<h1 style={headerStyle} className="ui column middle aligned header inverted row">Overview</h1>
				<div className="ui very padded text container segment">
					<div className="ui two column padded grid">
						<div className="column">
							<h1 className="ui left aligned header">{this.username}</h1>
							<div className="ui left aligned basic segment">
								<h3 className="ui left aligned header">Achievements:</h3>
								<p>1st: UTSLoLSoc Semester 1 Tournament 2016<br />
								3rd: UTSLoLSoc Winter Tournament 2015</p>
							</div>
						</div>
						<div className="column">
							<i className="huge circular user icon"></i>
						</div>
						<div className="column">
							<h3 className="ui left aligned header">
                                <i className="users icon"/>
                                Teams
                            </h3>
                            <div className="ui divider"></div>
                            <div className="ui container segments">
                                <div className="ui blue inverted top attached segment">
                                    <div className="ui grid two column row">
                                        <div className="eleven wide left aligned column">
                                            <h3 className="ui inverted left aligned header">
                                                Team 1  
                                            </h3>
                                        </div>
                                        <div className="five wide right aligned column">
                                        <div className="ui icon" data-content="You are the owner of this team">
                                            <i className="large yellow star icon"/>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui attached left aligned segment">
                                    <p>members go here</p>
                                </div>
                            </div>
						</div>
						<div className="column">
							<h3 className="ui left aligned header">
                                <i className="trophy icon"/>
                                Tournaments
                            </h3>
                            <div className="ui divider"></div>
                            <div className="item">
                                {this.renderTournaments()}
                            </div>
						</div>
					</div>
				</div>
	        </div>
        )
    }
}