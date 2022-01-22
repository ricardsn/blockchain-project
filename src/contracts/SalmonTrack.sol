// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import './Tether.sol';

contract SalmonTrack {
    struct Salmon {
        bytes32 tracker_id;
        string coordinate_url;
        uint weight;
        uint length;
        string image_url;
        uint status;
        uint catch_time;
        address catcher_id;
    }

    struct User {
        address user_id;
        string name;
        string surname;
        uint user_type;
    }

    address public admin;
    Tether public tether;

    mapping( address => User ) public users;
    mapping( bytes32 => Salmon ) public salmons;

    bytes32[] public salmonIds;

    constructor(Tether _tether) {
        tether = _tether;

        admin = msg.sender;
        users[admin].user_id = admin;
        users[admin].name = "Admin";
        users[admin].surname = "Administrators";
        users[admin].user_type = 1;
    }

    function addNewUser(address newUserID, string memory name, string memory surname, uint user_type)  public {
        require(
            msg.sender == admin,
            "Only admin can add users!"
        );
        require(
            users[newUserID].user_id != newUserID,
            "User already exists!"
        );
        require(
            user_type != 1,
            "Only one admin can exist!"
        );
          require(
            user_type > 1,
            "Enter valid type_id!"
        );

        users[newUserID].user_id = newUserID;
        users[newUserID].name = name;
        users[newUserID].surname = surname;
        users[newUserID].user_type = user_type;
    }

    function getUserNameSurname(address user_id) public view returns (string memory name, string memory surname) {        
        name = users[user_id].name;
        surname = users[user_id].surname;
    }

    function getUserType(address user_id) public view returns(uint256 userType) {
        userType = users[user_id].user_type;
    }

    function registerSalmon(
        bytes32 tracker_id,
        string memory coordinate_url,
        uint weight,
        uint length,
        string memory image_url,
        uint status,
        uint catch_time
        ) public {
        require(
            users[msg.sender].user_type == 1
            || users[msg.sender].user_type == 2
            || users[msg.sender].user_type == 3,
            "Add fish data can be managed by admin, scietist or authorized fisherman"
        );

        salmons[tracker_id] = Salmon(tracker_id, coordinate_url, weight, length, image_url, status, catch_time, users[msg.sender].user_id);
        tether.transfer(msg.sender, 1000000); // Getting reward for registrating a fish
    }

    function getSalmonData(bytes32 tracker_id) public view returns (
        string memory coordinate_url,
        uint weight,
        uint length,
        string memory image_url,
        uint status,
        uint catch_time,
        address catcher_id
    ) {
        Salmon memory salmon = salmons[tracker_id];
        User memory user = users[msg.sender];

        coordinate_url = "undefined";
        weight = salmon.weight;
        length = salmon.length;
        image_url = salmon.image_url;
        status = salmon.status;
        catch_time = salmon.catch_time;
        catcher_id = salmon.catcher_id;

        if (user.user_type == 1 || user.user_type == 2) {
             coordinate_url = salmon.coordinate_url;
        }
    }

    function getBalance(address user_id) public view returns (uint balance) {
        balance = tether.balanceOf(user_id);
    }
}