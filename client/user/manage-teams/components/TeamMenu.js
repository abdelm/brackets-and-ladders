//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies
import ApplicationItem from './ApplicationItem';

//Component: Team Menu - Menu for a specific team selected in the manage teams Menu
export default class TeamMenu extends React.Component{
    constructor(){
        super();

        this.state = {
            username: ""
        };

        this.renderMembers = this.renderMembers.bind(this);
        this.renderSubs = this.renderSubs.bind(this);
        this.checkLeaders = this.checkLeaders.bind(this);
        this.renderPendingApplications = this.renderPendingApplications.bind(this);
        this.renderPastApplications = this.renderPastApplications.bind(this);
    }

    //Semantic-UI tab javascript initialised the moment the component is mounted.
    componentDidMount(){
        $('.menu .item').tab();
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

    //Renders the list items for members and checks if a member is a leader or not.
    renderMembers(){
        const mainSize = 5;
        let members = this.props.members;
        let mainMembers = members.slice(0, mainSize);
        if(mainMembers.length > 0){
            return mainMembers.map((member) => {
                return this.checkLeaders(member);
            });
        };
    }

    //Renders the list items for subs.
    renderSubs(){
        const mainSize = 5;
        let members = this.props.members;
        let subMembers = members.slice(mainSize, members.length);
        if(subMembers.length > 0){
            return subMembers.map((member) => {
                return this.checkLeaders(member);
            });
        };
    }

    //Called by renderMembers() and checks whether given member is a leader or not.
    checkLeaders(member){
        let leaders = this.props.leaders;
        let memberLeader;
        leaders.map((leader) => {
            if(leader == member){
                memberLeader = member;
            };
        });
        if(member == memberLeader){
            return (
                <div key={member} className="item">
                    <i className="yellow star icon"/>
                    {member}
                </div>
            )
        } else {
            return (
                <div key={member} className="item">
                    {member}
                </div>
            )
        }
    }

    //NOTE: CONDITION NEEDED FOR DISPLAYING APPLICATION TAB, checks if logged in user is a leader
    //Renders Pending Applications
    renderPendingApplications(){
        let teamApplications = this.getTeamApplications();
        let pendingApplications = new Array;
        if(teamApplications.length > 0){
            teamApplications.forEach((application) => {
                if(application.status == "Pending"){
                    pendingApplications.push(application);
                }
            });
        }
        if(pendingApplications.length > 0){
            return pendingApplications.map((application) => {
                return (
                    <ApplicationItem
                    key={application._id}
                    applicationId={application._id}
                    applicantName={application.username}
                    applicationStatus={application.status}
                    teamId={this.props.teamId}
                    />
                )
            });
        } else {
            return(
                <div className="item">There are currently no pending applications to join your team</div>
            )
        }
    }

    //Renders Past Applications
    renderPastApplications(){
        let teamApplications = this.getTeamApplications();
        let pastApplications = new Array;
        if(teamApplications.length > 0){
            teamApplications.forEach((application) => {
                if(application.status != "Pending"){
                    pastApplications.push(application);
                }
            });
        }
        if(pastApplications.length > 0){
            return pastApplications.map((application) => {
                return (
                    <ApplicationItem
                    key={application._id}
                    applicationId={application._id}
                    applicantName={application.username}
                    applicationStatus={application.status}
                    teamId={this.props.teamId}
                    />
                )
            });
        } else {
            return(
                <div className="item">There is no history of applications to display</div>
            )
        }
    }

    //Filters applications and returns applications relevant to current team
    getTeamApplications(){
        let teamName = this.props.teamName;
        let playerApplications = this.props.playerApplications;
        let teamApplications = new Array;
        playerApplications.forEach((application) => {
            if(application.teamName == teamName){
                teamApplications.push(application);
            }
        });
        return teamApplications;
    }

    isUserLeader() {
        let leaders = this.props.leaders;
        let isUserLeader;
        leaders.map((leader) => {
            if(leader == this.username){
                isUserLeader = true;
            };
        });

        if (isUserLeader) {
            return true;
        } else {
            return false;
        }
    }

    render(){
        let teamName = this.props.teamName;
        let dateCreated = this.props.dateCreated;
        let applications = <p><br/>You must be the leader to approve/reject applications.</p>;

        if (this.isUserLeader()) {
            applications =
            <div>
                <div className="ui attached segment">
                    <div className="ui divided list">
                        {this.renderPendingApplications()}
                    </div>
                </div>
                <div className="ui attached segment">
                    <h3 className="ui dividing header">Past Applications</h3>
                    <div className="ui divided list">
                        {this.renderPastApplications()}
                    </div>
                </div>
            </div>;
        }

        return(
            <div className="ui stretched row two column grid">
                <div className="ui top attached blue segment row centered">
                    <h1 className="header column">{teamName}</h1>
                </div>
                <div className="ui attached segment row">
                    <div className="two wide column">
                        <div className="ui vertical tabular menu">
                            <a className="active blue item" data-tab="first">
                                Overview
                            </a>
                            <a className="blue item" data-tab="second">Applications</a>
                        </div>
                    </div>
                    <div className="right floated twelve wide column">
                        <div className="ui active tab stretched" data-tab="first">
                            <h2 className="ui top attached blue segment header">Overview</h2>
                            <div className="ui attached segment">
                                <h4 className="ui header">Members</h4>
                                <div className="ui horizontal divided list">
                                    {this.renderMembers()}
                                </div>
                            </div>
                            <div className="ui attached segment">
                                <h4 className="ui header">Substitutes</h4>
                                <div className="ui horizontal divided list">
                                    {this.renderSubs()}
                                </div>
                            </div>
                        </div>
                        <div className="ui tab stretched" data-tab="second">
                            <h2 className="ui top attached blue segment header">Applications</h2>
                            {applications}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
