import React, { Component } from "react";
import Navbar from "./Navbar";
import UserForm from "./UserForm";
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import SalmonTrack from '../truffle_abis/SalmonTrack.json';
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import CreateUser from "./CreateUser";
import RegisterSalmon from "./RegisterSalmon";

class App extends Component {
    containerFunctions = {
        createUser: this.createUser.bind(this),
        registerSalmon: this.registerSalmon.bind(this)
    };

    loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No connection with etherium browser detected!');
        }
    }

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadBlockchainData() {
        const { user_id } = this.state;

        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        this.setState({ user_id: account[0] });
        const networkId = await web3.eth.net.getId();

        // Loading contracts
        const tetherData = Tether.networks[networkId];

        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            this.setState({ tether });
            let tetherBalance = await tether.methods.balanceOf(account[0]).call();
            this.setState({ tetherBalance: tetherBalance.toString() });
        } else {
            window.alert('Tether contract was not deployed!')
        }

        const salmonTrackData = SalmonTrack.networks[networkId];
        if (salmonTrackData) {
            const salmonTrack = new web3.eth.Contract(SalmonTrack.abi, salmonTrackData.address);
            this.setState({ salmonTrack });
            let userData = await salmonTrack.methods.getUserNameSurname(account[0]).call();
            this.setState({ name: userData['name'], surname: userData['surname'] });
        } else {
            window.alert('SalmonTrack contract was not deployed!')
        }
    }

    createUser(event) {
        const { salmonTrack, user_id } = this.state;
        const data = event.target;
        event.preventDefault();

        try {
            salmonTrack.methods
                .addNewUser(data.user_id.value, data.name.value, data.surname.value, data.user_type.value)
                .send({ from: user_id })
                .on('transactionHash', (hash) => {
                    alert(`User ${data.user_id.value} was added!`);
                })
                .catch((err) => {  // Catching errors while contract is being ran
                    alert(err.message);
                });
        } catch (err) { // Catching errors that are caused before contract is ran
            alert(err.message);
        }
    }

    registerSalmon(event) {
        const { salmonTrack, user_id } = this.state;
        const data = event.target;
        event.preventDefault();

        try {
            salmonTrack.methods
                .registerSalmon(
                    data.tracker_id.value, 
                    'test.com/coordinates', 
                    data.weight.value,
                    data.length.value,
                    'test.com/image_url',
                    data.status.value,
                    Math.round(new Date(event.target.catch_time.value)/1000)
                )
                .send({ from: user_id })
                .on('transactionHash', (hash) => {
                    alert(`Salmon with tracker ${data.tracker_id.value} was registrated!`);
                })
                .catch((err) => {  // Catching errors while contract is being ran
                    alert(err.message);
                });
        } catch (err) { // Catching errors that are caused before contract is ran
            alert(err.message);
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            user_id: '0x0',
            tether: {},
            salmonTrack: {},
            tetherBalance: '0',
            isLoading: true,
            name: '',
            surname: ''
        }
    }

    render() {
        const { user_id } = this.state;
        console.log(this.state);
        return (
            <>
                <div>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout user_id={user_id} {...this.state} />} >
                                <Route index element={<Homepage { ...this.state }/>} />
                                <Route path="/create-user" element={<CreateUser { ...this.state } { ...this.containerFunctions }/>} />
                                <Route path="/register-salmon" element={<RegisterSalmon { ...this.state } { ...this.containerFunctions }/>} />
                                <Route
                                    path="*"
                                    element={<Navigate to="/" />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </>
        );
    }
}

export default App;