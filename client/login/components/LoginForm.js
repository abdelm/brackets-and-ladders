//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Component: LoginForm - Login form for the login page

export default class LoginForm extends React.Component{
    constructor(){
        super()
    }
//This is a template just for appearance's sake, nothing works
    render(){
        return(
            <form className="ui form">
                <div className="field">
                    <label>First Name</label>
                    <input name="first-name" placeholder="First Name" type="text" />
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input name="last-name" placeholder="Last Name" type="text" />
                </div>
                <div className="field">
                    <div className="ui checkbox">
                    <input className="hidden" tabindex="0" type="checkbox" />
                    <label>I agree to the Terms and Conditions</label>
                    </div>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        )
    }
}