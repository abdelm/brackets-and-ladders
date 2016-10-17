//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies
import Overview from './Overview';

//Page: Home - Landing page of site
export default class Home extends React.Component{
    render(){

        //CSS styles using React
        let mastheadStyle = {
            boxShadow: '0em 400em rgba(0, 0, 0, 0.7) inset',
            background: 'url(/images/masthead.jpg) no-repeat',
            minHeight: '50em',
        };
        let headerStyle = {
            fontSize: '50px',
            textTransform: 'uppercase',
            fontWeight: '300',
            letterSpacing: '10px',
        }
        let subHeaderStyle = {
            fontSize: '18px',
            fontWeight: '100',
            letterSpacing: '1px',
        }

        let homeButtons = null;
        let homePage = null;


        // If the user is not logged in, the page will display a basic Landing page screen.
        // However, if the user is logged in, an Overview page will appear, which will display 
        // information regarding user's teams and tournmanents they are apart of.
        if (!Meteor.userId()){
            homeButtons = <a className="ui inverted large button" href="/register">SIGN UP</a>;
            homePage = (
                <div className="column middle aligned ui centered grid">
                    <h1 style={headerStyle} className="ui column middle aligned header inverted row">Brackets and Ladders</h1>
                    <h2 style={subHeaderStyle} className="ui column middle aligned header inverted row">Your place for community driven tournaments</h2>
                    <div className="ui column middle aligned header row">
                        {homeButtons}
                    </div>
                </div>
            )
        } else {
            //display the Overview on the home page. Needed props are passed into the Overview.js file
            homePage = (
                <Overview
                    currentUser = {this.props.currentUser}
                    tournamentsResult = {this.props.tournamentsResult}
                    teamsResult=  {this.props.teamsResult} />
            )
        }

        //RETURN
        return (
            <div style={mastheadStyle} className="ui centered padded grid">
                {homePage}
            </div>
        )
    }
}
