//Import Packages
import React from 'react';

//Layout: Home - Layout for Home and its components
export default class HomeLayout extends React.Component{
    render(){
        return(
            <div>
                <header>{this.props.navBar}</header>
                <h1>Hello!</h1>
            </div>
        )
    }
}