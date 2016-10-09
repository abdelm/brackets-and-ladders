//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Application Item - item rendered in ManageTournamentsMenu Component
export default class ApplicationItem extends React.Component{
    constructor(){
        super()
        this.state = {
            applicationStatus: "Pending",
        }
    }
    
    //Sets the state of the application status when the component is loaded
    componentDidMount(){
        this.setState({applicationStatus: this.props.applicationStatus})
    }

    handleApplicationApproval(applicationId, status, event){
        event.preventDefault();
        let applicationParams = {
            "status": status,
            "applicationId": applicationId
        }

        Meteor.call('team_application_status_change', applicationParams,
            (err) => {
                if (err) {
                    console.log('Failed to ' + status + ' Application ' + applicationId);
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    console.log(status + ' Application ' + applicationId);
                    this.setState({applicationStatus: status});
                    if(status == "Approved"){
                        this.addTeam();
                    }
                }
            }
        )
    }

    addTeam(){
        let teamParams = {
            "tournamentId": this.props.tournamentId,
            "team": this.props.applicantTeamName,
        }

        Meteor.call('tournament_add_team', teamParams,
            (err) => {
                if (err) {
                    console.log('Failed to add team to tournament');
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    console.log('Successfully added team to tournament');
                }
            }
        )
    }

    render(){
        let applicationId = this.props.applicationId;
        let applicantName = this.props.applicantName;
        let applicantTeamName = this.props.applicantTeamName;

        //Different variations of rendering depending on whether the application is Pending or a Past application
        if(this.state.applicationStatus == "Pending"){
            item = (
                <div className="ui segment">
                    <h5 className="header left floated">{applicantTeamName}</h5>
                    <div className="right floated">
                        <button className="ui green button" onClick={(event) => this.handleApplicationApproval(applicationId, "Approved", event)}>Approve</button>
                        <button className="ui red button" onClick={(event) => this.handleApplicationApproval(applicationId, "Rejected", event)}>Reject</button>
                    </div>
                </div>
            )
        } else if (this.state.applicationStatus == "Approved"){
            item = (
                <div className="ui segment">
                    <h5 className="header left floated">{applicantTeamName}</h5>
                    <div className="right floated">
                        <i className="green check circle outline icon" />{this.state.applicationStatus}
                    </div>
                </div>
            )
        } else if (this.state.applicationStatus == "Rejected"){
            item = (
                <div className="ui segment">
                    <h5 className="header left floated">{applicantTeamName}</h5>
                    <div className="right floated">
                        <i className="red remove circle outline icon" />{this.state.applicationStatus}
                    </div>
                </div>
            )
        }

        return(
            <div id={applicationId} className="item">
                { item }
            </div>
        )
    }
}