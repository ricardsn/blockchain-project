import React, { Component } from 'react'

class UserForm extends Component {
    render() {
        const { createUser } = this.props;

        return (
            <form onSubmit={ createUser } >
                <div class="form-group">
                    <label for="userIdInput">User ID</label>
                    <input type="text" class="form-control" name="user_id" id="userIdInput" placeholder="Enter user id" />
                </div>
                <div class="form-group">
                    <label for="userNameInput">User name</label>
                    <input type="text" class="form-control" name="name" id="userNameInput" placeholder="Enter name" />
                </div>
                <div class="form-group">
                    <label for="userSurnameInput">User name</label>
                    <input type="text" class="form-control" name="surname" id="userSurnameInput" placeholder="Enter surname" />
                </div>
                <div class="form-group">
                    <label for="userType">User type</label>
                    <select class="form-control" id="userType" name="user_type">
                        <option value="1">Admin</option>
                        <option value="2">Scientist</option>
                        <option value="3">Authorized fisherman</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default UserForm;