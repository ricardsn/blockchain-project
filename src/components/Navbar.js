import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        const { user_id } = this.props;

        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{ backgroundColor: 'black', position: 'relative' }}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0'
                    style={{ color: 'white' }} href="/">
                    &nbsp; Salmon tracking dApp
                </a>
                <ul className='navbar-nav'>
                    <li className='text-nowrap '>
                        <Link to="/create-user">Create user</Link>
                    </li>
                    <li className='text-nowrap '>
                        <Link to="/register-salmon">Register Salmon</Link>
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