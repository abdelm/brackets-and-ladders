//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';



//Component: CreateTeamForm - Form used to create a team for tournaments

export default class CreateTeamForm extends React.Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        //Capture values in fields
        const name = ReactDOM.findDOMNode(this.refs.teamName).value;
        const leaderName = ReactDOM.findDOMNode(this.refs.teamLeader).value;
        const memberName2 = ReactDOM.findDOMNode(this.refs.teamMember2).value;
        const memberName3 = ReactDOM.findDOMNode(this.refs.teamMember3).value;
        const memberName4 = ReactDOM.findDOMNode(this.refs.teamMember4).value;
        const memberName5 = ReactDOM.findDOMNode(this.refs.teamMember5).value;
        //Put player usernames into an array
        const teamName = name;
        const leaders = leaderName;
        //const members = [leaderName, memberName2, memberName3, memberName4, memberName5];
        const members = {
                            leader: leaderName,
                            member2: memberName2,
                            member3: memberName3, 
                            member4: memberName4,
                            member5: memberName5      
                        };  
        Meteor.call('team_create', teamName, leaders, members,
            (err) => {
                if (err) {
                    console.log('Failed to create Team.');
                    console.log(err);
                } else {
                    console.log('Successfully created Team.');
                }
            }        
        /*This is for when we implement validation
        Meteor.call('team_create', }teamName, leaders, members},
            (err) => {
                if (err) {
                    console.log('Failed to create Team.');
                    console.log(err);
                } else {
                    console.log('Successfully created Team.');
                }
            }     
        */
        );
    }

    render(){
        return(
            <div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Team Name</label>
                        <input name="teamName" placeholder="Team Name" type="text" ref="teamName" />
                    </div>
                    <div className="field">
                        <label>Team Members</label>
                        <div className="field">
                            <input name="teamLeader" placeholder="THIS IS MEANT TO BE YOUR USERNAME!" type="text" ref="teamLeader" />
                        </div>
                        <div className="field">
                            <input name="teamMember2" placeholder="Team Member Username" type="text" ref="teamMember2" />
                        </div>
                        <div className="field">
                            <input name="teamMember3" placeholder="Team Member Username" type="text" ref="teamMember3" />
                        </div>
                        <div className="field">
                            <input name="teamMember4" placeholder="Team Member Username" type="text" ref="teamMember4" />
                        </div>
                        <div className="field">
                            <input name="teamMember5" placeholder="Team Member Username" type="text" ref="teamMember5" />
                        </div>
                    </div>
                    <button className="ui button primary" type="submit">Create Team</button>
                </form>
            </div>
        )
    }
}