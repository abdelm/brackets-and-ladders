//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Menu - Menu for a specific team selected in the manage teams Menu
export default class TeamMenu extends React.Component{
    constructor(){
        super()

        this.renderMembers = this.renderMembers.bind(this);
        this.checkLeaders = this.checkLeaders.bind(this);
    }

    componentDidMount(){
        $('.menu .item').tab();
    }

    renderMembers(){
        let members = this.props.members;
        if(members.length > 0){
            return members.map((member) => {
                return this.checkLeaders(member);
            });
        };
    }

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

    render(){
        let teamName = this.props.teamName;
        let members = this.props.members;
        let leaders = this.props.leaders;
        let dateCreated = this.props.dateCreated;

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
                            <a className="blue item" data-tab="second">
                                Applications
                            </a>
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
                        </div>
                        <div className="ui tab stretched" data-tab="second">
                            <h2 className="ui top attached blue segment header">Applications</h2>
                            <div className="ui attached segment">
                                <p>Hello 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}