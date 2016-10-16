//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Component: Tournament Item - item that contains tournament information
export default class TournamentItem extends React.Component{
    constructor(){
        super();

        this.hidePopup = this.hidePopup.bind(this);
        this.getUserTeams = this.getUserTeams.bind(this);
    }

    render(){
        return(
            <div className="ui container segments">
                <div className="ui blue inverted top attached segment">
                    <div className="ui grid two column row">
                        <div className="eleven wide left aligned column">
                            <h3 className="ui inverted left aligned header">
                                Tournament 1  
                            </h3>
                        </div>
                        <div className="five wide right aligned column">
                            <i className="large setting icon"/>
                            <i className="large users icon"/>
                        </div>
                    </div>
                </div>
                <div className="ui attached left aligned segment">
                    <p>teams competing go here</p>
                </div>
            </div>
        )
    }
}

