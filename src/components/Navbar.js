import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_TYPE, FISHERMAN_TYPE, SCIENTIST_TYPE } from './configs';

class Navbar extends Component {
    render() {
        const { user_id, user_type } = this.props;
        console.log(this.props);

        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{ backgroundColor: 'black', position: 'relative' }}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0'
                    style={{ color: 'white' }} href="/">
                    &nbsp; Salmon tracking dApp
                </a>
                <ul className='navbar-nav'>
                    {
                        (user_type == ADMIN_TYPE)
                            ? <li className='text-nowrap '>
                                <a href={`${window.location.origin}/create-user`}>Create user</a>
                            </li>
                            : null
                    }

                    <li className='text-nowrap '>
                        <a href={`${window.location.origin}/register-salmon`}>Register Salmon</a>
                    </li>


                    <li className='text-nowrap '>
                        <a href={`${window.location.origin}/salmon-list-page`}>Salmon list</a>
                    </li>

                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                        <small style={{ color: 'white' }}>ACCOUNT NUMBER: {user_id}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;