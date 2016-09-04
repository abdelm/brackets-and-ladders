//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Card - Card that displays team information
export default class TeamCard extends React.Component{
    render(){
        return(
            <div>
                <h1>Team - {this.props.teamName}</h1>
                <div>
                    <h5>Created {this.props.dateCreated.toString()}</h5>
                </div>
                <div>
                    <div>Leader : {this.props.leaders.toString()}</div>
                    <div>{this.props.leader.toString()}</div>
                    <div>{this.props.member2.toString()}</div>
                    <div>{this.props.member3.toString()}</div>
                    <div>{this.props.member4.toString()}</div>
                    <div>{this.props.member5.toString()}</div>
                </div>
            </div>
        )
    }
}