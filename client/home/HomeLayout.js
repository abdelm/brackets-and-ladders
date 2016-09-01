//Import Packages
import React from 'react';

//Layout: Home - Layout for Home and its components


export default class HomeLayout extends React.Component{
    render(){
        const title = "Brackets and Ladders - Home"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <h1>Hello!</h1>
                <div>{this.props.home}</div>
            </div>
        )
    }
}