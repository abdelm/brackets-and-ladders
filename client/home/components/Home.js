//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies


//Page: Home - Landing page of site
export default class Home extends React.Component{
    render(){
        return (
        	<div className="ui text container">
				<div className="ui raised padded text container segment">
					<h1 className="ui header">
						Welcome to Brackets and Ladders!
					</h1>
					<p>To get started, press the Login button to access your 
					account.</p>
					<p>If you have not signed up yet, press the Sign-up button 
					where you are able to create a new account.</p>
				</div>
			</div>
        )
    }
}
