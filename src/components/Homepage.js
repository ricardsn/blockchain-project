import React, { Component } from 'react'

class Homepage extends Component {
    render() {
        const { name, surname, tetherBalance } = this.props;

        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Welcome!</h1>
                {
                    name || surname
                        ? <h1 style={{ textAlign: 'center' }}> {name} {surname} </h1>
                        : <h1 style={{ textAlign: 'center' }}> Guest </h1>
                }
                <h1 style={{ textAlign: 'center' }}> Your bonus in tUSDT:  {tetherBalance ? tetherBalance.toString() : 0} tUSDT</h1>

                <h1 style={{ textAlign: 'center' }}> tUSDT to Eth:  {tetherBalance ? window.web3.utils.fromWei(tetherBalance.toString()) : 0} Eth</h1>
            </div>
        )
    }
}

export default Homepage;