//Import Packages
import React from 'react';

//Layout: Home - Layout for Home and its components


export default class LoginLayout extends React.Component{
    render(){
        const title = "Brackets and Ladders - Login"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div>LOGIN FORM / STUFF HERE</div>
            </div>
        )
    }
}