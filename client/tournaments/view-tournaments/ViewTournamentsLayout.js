//Import Packages
import React from 'react';

//Layout: View-Tournaments - Layout for the View Tournaments page and its components


export default class ViewTournamentsLayout extends React.Component{
    render(){
        const title = "View Tournaments | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div className="ui raised padded text container segment">
                    <div>{this.props.container}</div>
                </div>
            </div>
        )
    }
}