//Import Packages
import React from 'react';

//Layout: ViewTeam - Layout for View team and its components


export default class ViewTeamsLayout extends React.Component{
    render(){
        const title = "View Team | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div className="ui container vertical segment">{this.props.container}</div>
            </div>
        )
    }
}
