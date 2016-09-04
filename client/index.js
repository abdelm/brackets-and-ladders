//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

//Import Dependencies
//Layouts
import HomeLayout from './home/HomeLayout';
import LoginLayout from './login/LoginLayout';
import RegisterLayout from './register/RegisterLayout';
import AboutLayout from './about/AboutLayout';
import CreateTeamLayout from './tournaments/create-team/CreateTeamLayout';
import ViewTeamLayout from './tournaments/view-teams/ViewTeamLayout';

//Components
import NavBar from './common/NavBar';
import Home from './home/components/Home';
import About from './about/components/About';
import LoginForm from './login/components/LoginForm';
import RegisterForm from './register/components/RegisterForm';
import CreateTeamForm from './tournaments/create-team/components/CreateTeamForm';

//Containers
import ViewTeamContainer from './tournaments/view-teams/ViewTeamContainer';

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

FlowRouter.route("/register", {
    name: "Register",
    action() {
        mount(RegisterLayout, {
            navBar: (<NavBar />),
            registerForm: (<RegisterForm />),
        })
    }
});

FlowRouter.route("/about", {
    name: "About",
    action() {
        mount(AboutLayout, {
            navBar: (<NavBar />),
            about: (<About />),
        })
    }
});

FlowRouter.route("/create-team", {
    name: "Create Team",
    action() {
        mount(CreateTeamLayout, {
            navBar: (<NavBar />),
            createTeamForm: (<CreateTeamForm />),           
        })
    }
});

FlowRouter.route("/view-teams", {
    name: "View Teams",
    action() {
        mount(ViewTeamLayout, {
            navBar: (<NavBar />),
            container: (<ViewTeamContainer />),           
        })
    }
});


