//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Team Item - item that contains team information
export default class TeamItem extends React.Component{
    constructor(){
        super();
    }



    render(){
        return(
            <div className="ui container segments">
                <div className="ui blue inverted top attached segment">
                    <div className="ui grid two column row">
                        <div className="eleven wide left aligned column">
                            <h3 className="ui inverted left aligned header">
                                test
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
        )
    }
}
