//Import Packages
import React from 'react';

//Layout: ViewTeam - Layout for View team and its components


export default class ViewTEamLayout extends React.Component{
    render(){
        const title = "View Team | Brackets and Ladders"
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
