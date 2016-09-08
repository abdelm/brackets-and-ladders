//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Card - Card that displays team information
export default class TeamCard extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        $('.ui.accordion').accordion();
    }
    
    render(){
        return(
            <div className="card four wide column">
                <div className="content">
                    <h1 className="header">Team - {this.props.teamName}</h1>
                </div>
                <div className="content">
                    <h5>Created {this.props.dateCreated.toString()}</h5>
                </div>
                <div className="content">
                    <div className="content"><b>Leader:</b> 
                        <div>{this.props.leaders.toString()}</div>
                    </div>
                    <div className="ui accordion">
                        <div className="title">
                            <i className="dropdown icon"/><b>Members</b>
                        </div>
                        <div className="content">
                            <div className="ui list transition hidden">
                                <div className="item">{this.props.leader.toString()}</div>
                                <div className="item">{this.props.member2.toString()}</div>
                                <div className="item">{this.props.member3.toString()}</div>
                                <div className="item">{this.props.member4.toString()}</div>
                                <div className="item">{this.props.member5.toString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui content grid">
                    <button className="ui column middle aligned button">Apply to Join</button>
                </div>
            </div>
        )
    }
}
