//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Application Item - item rendered in TeamMenu component, specifically in the applications tab
export default class ApplicationItem extends React.Component{
    constructor(){
        super()
        this.state = {
            applicationStatus: "Pending",
        }

        this.handleApplicationApproval = this.handleApplicationApproval.bind(this);
        this.addNewMember = this.addNewMember.bind(this);
    }

    //Sets the state of the application status when the component is loaded
    componentDidMount(){
        this.setState({applicationStatus: this.props.applicationStatus})
    }

    //Handler for when either the rejection or approval buttons are pressed. This method changes the status of the application
    //in the document stored within the playerApplications collection and calls the addNewMember() method
    handleApplicationApproval(applicationId, status, event){
        event.preventDefault();
        let applicationParams = {
            "status": status,
            "applicationId": applicationId
        }

        Meteor.call('player_application_status_change', applicationParams,
            (err) => {
                if (err) {
                    console.log('Failed to ' + status + ' Application ' + applicationId);
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    console.log(status + ' Application ' + applicationId);
                    this.setState({applicationStatus: status});
                    if(status == "Approved"){
                        this.addNewMember();
                    }
                }
            }
        )
    }

    //Called by handleApplicationApproval(). This method adds the applicant to the current team
    addNewMember(){
        let memberParams = {
            "teamId": this.props.teamId,
            "member": this.props.applicantName
        }

        Meteor.call('team_add_player', memberParams,
            (err) => {
                if (err) {
                    console.log('Failed to add player to team');
                    this.setState({error: err.reason});
                    console.log(err);
                } else {
                    console.log('Successfully added player to team');
                }
            }
        )
    }

    render(){
        let applicationId = this.props.applicationId;
        let applicantName = this.props.applicantName;

        //Different variations of rendering depending on whether the application is Pending or a Past application
        if(this.state.applicationStatus == "Pending"){
            item = (
                <div>
                    <h5 className="header left floated">{applicantName}</h5>
                    <div className="right floated">
                        <button className="ui green button" onClick={(event) => this.handleApplicationApproval(applicationId, "Approved", event)}>Approve</button>
                        <button className="ui red button" onClick={(event) => this.handleApplicationApproval(applicationId, "Rejected", event)}>Reject</button>
                    </div>
                </div>
            )
        } else if (this.state.applicationStatus == "Approved"){
            item = (
                <div>
                    <h5 className="header left floated">{applicantName}</h5>
                    <div className="right floated">
                        <i className="green check circle outline icon" />{this.state.applicationStatus}
                    </div>
                </div>
            )
        } else if (this.state.applicationStatus == "Rejected"){
            item = (
                <div>
                    <h5 className="header left floated">{applicantName}</h5>
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