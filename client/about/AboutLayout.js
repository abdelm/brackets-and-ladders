//Import Packages
import React from 'react';

//Layout: Home - Layout for Home and its components


export default class AboutLayout extends React.Component{
    render(){
        const title = "About - Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div>ABOUT STUFF HERE</div>
            </div>
        )
    }
}