//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

//Import Dependencies
//Layouts
import HomeLayout from './home/HomeLayout';

//Components
import NavBar from './common/NavBar';

/*

This is the main routing file, all routes are placed in here

*/

FlowRouter.route("/", {
    action() {
        mount(HomeLayout, {
            navBar: (<NavBar />)
        })
    }
});

