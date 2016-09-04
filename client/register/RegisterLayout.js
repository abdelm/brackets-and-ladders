//Import Packages
import React from 'react';

//Layout: Login - Layout for Login and its components


export default class RegisterLayout extends React.Component{
    componentDidMount(){
        if (Meteor.userId()) {
            FlowRouter.go("/");
        }
    }
    
    render(){
        const title = "Register | Brackets and Ladders"
        DocHead.setTitle(title);

        return(
            <div>
                <div>{this.props.navBar}</div>
                <div>{this.props.registerForm}</div>
            </div>
        )
    }
}
