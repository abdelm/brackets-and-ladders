//Import Packages
import React from 'react';

//Layout: Manage Tournaments - Layout for the Manage Tournaments page for tournament hosts


export default class ManageTournamentsLayout extends React.Component{
    render(){
        const title = "Manage Tournaments | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div className="ui basic segment">{this.props.container}</div>
            </div>
        )
    }
}