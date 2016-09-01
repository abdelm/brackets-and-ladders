//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

//Import Dependencies
//Layouts
import HomeLayout from './home/HomeLayout';
import LoginLayout from './login/LoginLayout';
import AboutLayout from './about/AboutLayout';

//Components
import NavBar from './common/NavBar';
import Home from './home/components/Home';
import LoginForm from './login/components/LoginForm';

/*

This is the main routing file, all routes are placed in here

*/

FlowRouter.route("/", {
    name: "Home",
    action() {
        mount(HomeLayout, {
            navBar: (<NavBar />),
            home: (<Home />),
        })
    }
});

FlowRouter.route("/login", {
    name: "Login",
    action() {
        mount(LoginLayout, {
            navBar: (<NavBar />),
            loginForm: (<LoginForm />),
        })
    }
});

FlowRouter.route("/about", {
    name: "About",
    action() {
        mount(AboutLayout, {
            navBar: (<NavBar />),
        })
    }
});


