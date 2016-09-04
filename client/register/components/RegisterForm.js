//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies

//Component: LoginForm - Login form for the login page

export default class RegisterForm extends React.Component{
    constructor(){
        super();
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(event){
        event.preventDefault();
        //Find the values in elements ref which are specified
        const username = ReactDOM.findDOMNode(this.refs.username).value;
        const password = ReactDOM.findDOMNode(this.refs.password).value;
        //Invoke meteor method to create account, accounts.create method is serverside and is called from there
        Meteor.call('accounts.create', username, password,
            (err) => {
                if (err) {
                    console.log('Registration Failure.');
                    console.log(err);
                } else {
                    console.log('Registration Success.');
                    FlowRouter.go("/");
                }
            }
        );
    }
    
    render(){
        return(
            <div>
                <form className="ui form" onSubmit={this.handleRegister}>
                    <div className="field">
                        <label>Username</label>
                        <input name="username" placeholder="Username" type="text" ref="username" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input name="password" placeholder="Password" type="password" ref="password" />
                    </div>
                    <button className="ui button primary" type="submit">Sign Up</button>
                </form>
                <div className="ui bottom attached warning message">
                    <i className="icon help"></i>
                    Already signed up? <a href="/login">Login here</a> instead.
                </div>
            </div>
        )
    }
}