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
						<h1 className="ui header">About</h1>
						<p>ABOUT SECTION IN HERE</p>
						<p>SECOND PARAGRAPH OF ABOUT SECTION HERE </p>
					</div>
					<div className="eight right aligned column">
						<h2>Team Members:</h2>
						
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