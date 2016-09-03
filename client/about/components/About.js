//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Page: About - About page regarding the information about the website
export default class About extends React.Component{
    render(){
        return (
        	<div className="ui text container">
        		<h1 className="ui header">About</h1>
	        	<div className="ui raised very padded text container segment">
					<div className="ui two column divided grid">
						<div className="column">
							<p>ABOUT SECTION IN HERE</p>
							<p>SECOND PARAGRAPH OF ABOUT SECTION HERE </p>
						</div>
						<div className="column">
							<h2>Team Members:</h2>
							<p>Sebastian Guillema, Hayden Crain, Abelrahman Ahmed, 
							Ken Wong, Chris Benco and Muhammed Ali.</p>
						</div>
					</div>
				</div>
        	</div>	
        )
    }
}