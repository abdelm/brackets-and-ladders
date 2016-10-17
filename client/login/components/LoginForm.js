//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

//Import Dependencies

//Component: LoginForm - Login form for the login page

export default class LoginForm extends React.Component{
    constructor(){
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {error: false};
    }

    handleLogin(event) {
        //Find the values in elements ref which are specified
        const username = ReactDOM.findDOMNode(this.refs.username).value;
        const password = ReactDOM.findDOMNode(this.refs.password).value;
        event.preventDefault();
        //Invokes Meteor method to log in
        Meteor.loginWithPassword(username, password,
            (err) => {
                if (err) {
                    this.setState({error: true});
                    console.log('Login Failure.');
                    console.log(err);
                } else {
                    console.log('Login Success.');
                    FlowRouter.go("/"); // Redirect to homepage
                }
            }
        );
    }

    render(){
        let errorMessage;
        if (this.state.error !== false){
            errorMessage = (
                <div className="ui top attached error message">
                    <i className="icon warning"></i>
                    Incorrect username or password. Please try again.
                </div>
            )
        }
        return(
            <div className="ui raised padded text container segment">
                {errorMessage}
                <form className="ui large form" onSubmit={this.handleLogin}>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input name="username" placeholder="Username" type="text" ref="username" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input name="password" placeholder="Password" type="password" ref="password" />
                        </div>
                    </div>
                    <button className="ui button primary" type="submit">Login</button>
                </form>
                <div className="ui bottom attached warning message">
                    <i className="icon help"></i>
                    Not a member? You can <a href="/register">Sign-up here</a> instead.
                </div>
            </div>
        )
    }
}
