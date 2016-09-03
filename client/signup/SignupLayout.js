//Import Packages
import React from 'react';

//Layout: Signup - Layout for Signup and its components


export default class SignupLayout extends React.Component{
    render(){
        const title = "Create an Account | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div className="ui raised padded text container segment">
                    <div>{this.props.signupForm}</div>
                </div>
            </div>
        )
    }
}