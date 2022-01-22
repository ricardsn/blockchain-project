const Tether = artifacts.require('Tether');
const SalmonTrack = artifacts.require('SalmonTrack');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Tether);
    const reward = await Tether.deployed();
    
    await deployer.deploy(SalmonTrack, reward.address);
    const salmonTrack = await SalmonTrack.deployed();

    // Adding all reward tokens to SalmonTrack
    await reward.transfer(salmonTrack.address, '1000000000000000000000000');
}