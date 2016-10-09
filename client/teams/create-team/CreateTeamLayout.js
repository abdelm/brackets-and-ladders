//Import Packages
import React from 'react';

//Layout: Create-Team - Layout for the Create Team page and its components


export default class CreateTeamLayout extends React.Component{
    render(){
        const title = "Create Team | Brackets and Ladders"
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