//Import Packages
import React from 'react';

//Import Dependencies
import '../common/stylesheet.css';

//Layout: Home - Layout for Home and its components


export default class HomeLayout extends React.Component{
    render(){
        const title = "Home | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div>{this.props.home}</div>
            </div>
        )
    }
}