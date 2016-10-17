//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Item - item that contains team information
export default class TeamItem extends React.Component{
    //constructor initialises starting states 
    constructor(){
        super(); //this method invokes the parent class' constructor
    }

   //this is called immediately after the component is rendered. checks if the components was mounted
    componentDidMount(){
        //Semantic UI. creates an accordion
        $('.ui.accordion').accordion();
        
        //Semantic UI. creates a popup 
        $('.leaderIcon').popup();
    }

    //Handles displaying the members of the team
    printMembers(){
        const members = this.props.members;
        return members.map((member)=>{
            return(<div key={member._id} className="item">{member}</div>);
        });
    }

    render(){

        //props needed for checking if the user is a leader and showing that in the team card
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

        //if the user is the leader, display a yellow star icon
        if(isUserLeader){
            leaderIcon = (
                <div className="ui icon leaderIcon" data-offset="21" data-content="You are the owner of this team" data-variation="inverted">
                    <i className="large yellow star icon"/>
                </div>
            )
        }

        //RETURN
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
