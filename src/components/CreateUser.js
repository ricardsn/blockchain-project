import React, { Component } from 'react'
import UserForm from './UserForm';

class CreateUser extends Component {
    render() {
        const { createUser } = this.props;

        return (
            <div>
                <UserForm createUser={ createUser } />
            </div>
        )
    }
}

export default CreateUser;