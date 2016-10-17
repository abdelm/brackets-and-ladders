//Import Packages
import React from 'react';

//Import Dependencies
import '../common/stylesheet.css';

//Layout: Home - Basic Layout for Home and its components
export default class HomeLayout extends React.Component{
    render(){
        const title = "Home | Brackets and Ladders"
        DocHead.setTitle(title);

        //RETURN
        return(
            <div>
                <div>{this.props.navBar}</div>
                <div>{this.props.container}</div>
            </div>
        )
    }
}
