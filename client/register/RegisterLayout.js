//Import Packages
import React from 'react';

//Layout: Login - Layout for Login and its components


export default class RegisterLayout extends React.Component{
    render(){
        const title = "Register | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div className="ui raised padded text container segment">
                    <div>{this.props.registerForm}</div>
                </div>
            </div>
        )
    }
}