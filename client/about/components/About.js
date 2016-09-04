//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Page: About - About page regarding the information about the website
export default class About extends React.Component{
    render(){
        return (
            <div className="ui raised very padded text container segment">
                <div className="ui two column divided grid">
                    <div className="column">
                        <h2 className="ui header">About</h2>
                        <p>A place for organising gaming tournaments and ladder systems for a variety of online video games. The system allows users to log in, form teams, and build tournament brackets and match-ups with seeding and playoffs.</p>
                    </div>
                    <div className="right aligned column">
                        <h2>Team Members</h2>
                        <p>Sebastian Guillema <br />
                        Hayden Crain <br />
                        Abelrahman Ahmed <br />
                        Ken Wong <br />
                        Chris Benco <br />
                        Muhammed Ali</p>
                    </div>
                </div>
            </div>
        )
    }
}
