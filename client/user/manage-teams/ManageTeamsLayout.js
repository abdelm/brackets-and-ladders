//Import Packages
import React from 'react';

//Layout: Manage Teams - Layout for the Manage Teams page for Users


export default class ManageTeamsLayout extends React.Component{
    render(){
        const title = "Manage Teams | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div className="ui basic segment">{this.props.container}</div>
            </div>
        )
    }
}