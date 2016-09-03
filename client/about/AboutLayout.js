//Import Packages
import React from 'react';

//Layout: About - Layout for About and its components


export default class AboutLayout extends React.Component{
    render(){
        const title = "About | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div>{this.props.about}</div>
            </div>
        )
    }
}