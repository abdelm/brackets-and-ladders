//Import Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//Import Dependencies


//Page: Home - Landing page of site
export default class Home extends React.Component{
    render(){
        //CSS styles using React
        let mastheadStyle = {
            boxShadow: '0em 50em rgba(0, 0, 0, 0.7) inset',
            background: 'url(/images/masthead.jpg)',
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
        // Hide sign up if user is logged in
        // @todo new buttons for logged in members?
        if (!Meteor.userId()){
            homeButtons = <a className="ui inverted large button" href="/register">SIGN UP</a>;
        }

        return (
            <div style={mastheadStyle} className="ui centered padded grid">
                <div className="column middle aligned ui centered grid">
                    <h1 style={headerStyle} className="ui column middle aligned header inverted row">Brackets and Ladders</h1>
                    <h2 style={subHeaderStyle} className="ui column middle aligned header inverted row">Your place for community driven tournaments</h2>
                    <div className="ui column middle aligned header row">
                        {homeButtons}
                    </div>
                </div>
            </div>
        )
    }
}
