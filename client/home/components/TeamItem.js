//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Item - item that contains team information
export default class TeamItem extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        $('.ui.accordion').accordion();
    }

    //Handles displaying the members of the team
    printMembers(){
        const members = this.props.members;
        return members.map((member)=>{
            return(<div key={member._id} className="item">{member}</div>);
        });
    }

    render(){

        //Checks if player is the captain of the team
        let members = this.props.members;
        let teamName = this.props.teamName;
        let username = this.props.username;
        let leaders = this.props.leaders;
        let isUserLeader = false;
        let leaderIcon;

        //for each loop in members and check if any member usernames match current username
        leaders.forEach((leader) => {
            if (leader == username){
                isUserLeader = true;
            }
        });

        if(isUserLeader){
            leaderIcon = (
                <div className="ui icon" data-content="You are the owner of this team">
                    <i className="large yellow star icon"/>
                </div>
            )
        }

        return(
            <div className="ui container segments">
                <div className="ui blue inverted top attached segment">
                    <div className="ui grid two column row">
                        <div className="eleven wide left aligned column">
                            <h3 className="ui inverted left aligned header">
                                {this.props.teamName}
                            </h3>
                        </div>
                        <div className="five wide right aligned column">
                                {leaderIcon}
                        </div>
                    </div>
                </div>
                <div className="ui attached left aligned segment">
                    <div className="ui accordion">
                        <div className="title">
                            <i className="dropdown icon"/><b>Members</b>
                        </div>
                        <div className="content">
                            <div className="ui list transition hidden">
                                {this.printMembers()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
