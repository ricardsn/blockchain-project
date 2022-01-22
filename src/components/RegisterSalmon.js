import React, { Component } from 'react'
import SalmonForm from './SalmonForm';
import UserForm from './UserForm';

class RegisterSalmon extends Component {
    render() {
        const { registerSalmon } = this.props;

        return (
            <div>
                <SalmonForm registerSalmon={ registerSalmon } />
            </div>
        )
    }
}

export default RegisterSalmon;