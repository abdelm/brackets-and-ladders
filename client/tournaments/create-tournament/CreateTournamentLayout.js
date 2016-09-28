//Import Packages
import React from 'react';

//Layout: Create-Tournament - Layout for the Create Tournament page and its components


export default class CreateTournamentLayout extends React.Component{
    render(){
        const title = "Create Tournament | Brackets and Ladders"
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