// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Tether.sol";

contract SalmonTrack {
    struct Salmon {
        bytes32 tracker_id;
        string coordinate_url;
        uint256 weight;
        uint256 length;
        string image_url;
        uint8 status;
        uint256 catch_time;
        address catcher_id;
    }

    struct User {
        address user_id;
        string name;
        string surname;
        uint256 user_type;
    }

    address public admin;
    Tether public tether;

    mapping(address => User) public users;
    mapping(bytes32 => Salmon[]) public salmons;

    bytes32[] public salmonIds;

    constructor(Tether _tether) {
        tether = _tether;

        admin = msg.sender;
        users[admin].user_id = admin;
        users[admin].name = "Admin";
        users[admin].surname = "Administrators";
        users[admin].user_type = 1;
    }

    function addNewUser(
        address newUserID,
        string memory name,
        string memory surname,
        uint256 user_type
    ) public {
        require(msg.sender == admin, "Only admin can add users!");
        require(users[newUserID].user_id != newUserID, "User already exists!");
        require(user_type != 1, "Only one admin can exist!");
        require(
            user_type > 1 && (user_type == 2 || user_type == 3),
            "Enter valid type_id!"
        );

        users[newUserID].user_id = newUserID;
        users[newUserID].name = name;
        users[newUserID].surname = surname;
        users[newUserID].user_type = user_type;
    }

    function getUserNameSurname(address user_id)
        public
        view
        returns (string memory name, string memory surname)
    {
        require(msg.sender == admin, "Only admin can see user names!");
        name = users[user_id].name;
        surname = users[user_id].surname;
    }

    function getUserType(address user_id)
        public
        view
        returns (uint256 userType)
    {
        userType = users[user_id].user_type;
    }

    function registerSalmon(
        bytes32 tracker_id,
        string memory coordinate_url,
        uint256 weight,
        uint256 length,
        string memory image_url,
        uint8 status,
        uint256 catch_time
    ) public {
        if (salmons[tracker_id].length == 0) {
            require(
                (users[msg.sender].user_type == 1 ||  // Checking if user is scientist, admin or authorized fisherman
                    users[msg.sender].user_type == 2 ||
                    users[msg.sender].user_type == 3),
                "Add first fish data can be managed by admin, scietist or authorized fisherman"
            );
        }

        require(
            status == 0 || status == 1,
            "There are only 2 statuses -> Dead or Alive"
        );

        require(catch_time <= block.timestamp, "Please enter valid date!");

        if (salmons[tracker_id].length != 0) { // Checking if Salmon with that tracker_id was registrated before
            uint256 arrLength = salmons[tracker_id].length;

            require(
                salmons[tracker_id][arrLength - 1].length <= length &&
                    salmons[tracker_id][arrLength - 1].catch_time <= catch_time, // If it was check if inputted new catch_time is not less than before
                "Data is invalid fish can't shrink or be caught in past!"
            );

            if (salmons[tracker_id][arrLength - 1].status == 0) { // If Salmon was marked as dead before, then nothing can be done anymore 
                require(false, "You cannot change the dead!");
            }
        }

        salmons[tracker_id].push(
            Salmon(
                tracker_id,
                coordinate_url,
                weight,
                length,
                image_url,
                status,
                catch_time,
                msg.sender
            )
        );

        tether.transfer(msg.sender, 500000000000000); // Getting reward (0.0005 eth) for registrating a fish
        salmonIds.push(tracker_id);
    }

    function getSalmonData(bytes32 tracker_id)
        public
        view
        returns (Salmon[] memory salmonData)
    {
        User memory user = users[msg.sender];

        require(salmons[tracker_id].length != 0, "No Salmon found!");

        salmonData = salmons[tracker_id];
        for (uint i = 0; i < salmons[tracker_id].length; i = i + 1) {  // If user is not admin or scientist then do not send url containing location
            if (user.user_type != 1 && user.user_type != 2) {
                salmonData[i].coordinate_url = "undefined";
            }
        }
    }

    function getSalmonIds()
        public
        view
        returns (bytes32[] memory salmonIdsArr)
    {
        salmonIdsArr = salmonIds;
    }

    function getBalance(address user_id) public view returns (uint256 balance) {
        balance = tether.balanceOf(user_id);
    }
}
