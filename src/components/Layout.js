import React, { Component } from "react";
import { render } from "react-dom";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";

class Layout extends Component {
    render() {
        const { user_id } = this.props;

        return (
            <>
                <Navbar user_id={ user_id } />
    
                <Outlet />
            </>
        )
    }
}

export default Layout;