const assert = require('assert');

const Tether = artifacts.require('Tether');
const SalmonTrack = artifacts.require('SalmonTrack');

require('chai')
.use(require('chai-as-promised'))
.should();

contract('SalmonTrack', ([admin, scientist, authorized_fisherman, guest]) => {
    let tether, salmonTrack;

    function getTokenValueFromEth(value) {
        return web3.utils.toWei(value, 'Ether');
    }

    before(async () => {
        tether = await Tether.new();
        salmonTrack = await SalmonTrack.new(tether.address);

        await tether.transfer(salmonTrack.address, getTokenValueFromEth('1000000'));
    })

    describe('Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Tether');
        })
    });

    describe('SalmonTrack Deployment', async () => {
        it('contract has Tether tokens', async () => {
            let balance = await tether.balanceOf(salmonTrack.address);
            assert.equal(balance, getTokenValueFromEth('1000000'));
        });

        it('cannot transfer more than contract has tokens', async () => {
            await tether.transfer(guest, getTokenValueFromEth('1000001')).should.be.rejected;
        });

        it('Only one admin can exist', async () => {
            await salmonTrack.addNewUser(scientist, "Ricards", "Nedosvitnijs", 1).should.be.rejected;
        });

        it('User can be created', async () => {
            await salmonTrack.addNewUser(scientist, "Ricards", "Nedosvitnijs", 2).should.be.fulfilled;
        });

        it('Same user cant be created twice', async () => {
            await salmonTrack.addNewUser(scientist, "Ricards", "Nedosvitnijs", 2).should.be.rejected;
        });

        it('Wrong user type is rejected', async () => {
            let salmonTrack = await SalmonTrack.new(tether.address); 
            await salmonTrack.addNewUser(scientist, "Ricards", "Nedosvitnijs", 4).should.be.rejected;
        });

        it('Salmon was created and bilance was increased', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000000',
                'test.com/coordinates',
                3000,
                112,
                'test.com/img',
                1,
                1642982400,
                { from: admin }
            );
            let balance = await salmonTrack.getBalance(admin);
            assert.equal(balance, getTokenValueFromEth('0.0005'));
        });

        it('Salmon cannot be caught earlier than it was recorded before', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000000',
                'test.com/coordinates',
                3000,
                112,
                'test.com/img',
                1,
                260000,
                { from: admin }
            ).should.be.rejected;
        });

        it('First Salmon record cant be registrated by guest user ', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000001',
                'test.com/coordinates',
                3000,
                112,
                'test.com/img',
                1,
                1642982400,
                { from: guest }
            ).should.be.rejected;
        });

        it('Salmon cannot be registrated in future', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000001',
                'test.com/coordinates',
                3000,
                112,
                'test.com/img',
                1,
                2742982400,
                { from: admin }
            ).should.be.rejected;
        });

        it('Salmon cannot be saved with wrong status', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000000',
                'test.com/coordinates',
                3000,
                112,
                'test.com/img',
                3,
                1642982400,
                { from: admin }
            ).should.be.rejected;
        });

        it('Salmon cannot get shorter', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000000',
                'test.com/coordinates',
                3000,
                110,
                'test.com/img',
                1,
                1642982400,
                { from: admin }
            ).should.be.rejected;
        });

        it('Salmon status can be changed to dead', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000000',
                'test.com/coordinates',
                3000,
                114,
                'test.com/img',
                0,
                1642982400,
                { from: admin }
            );
        });

        it('Salmon status cannot be changed after its status is declared dead', async () => {
            await salmonTrack.registerSalmon(
                '0x7465737400000000000000000000000000000000000000000000000000000000',
                'test.com/coordinates',
                3000,
                114,
                'test.com/img',
                1,
                1642982400,
                { from: admin }
            ).should.be.rejected;
        });

        it('User can have access to Salmon list data', async () => {
            await salmonTrack.getSalmonIds({ from: guest });
        });

        it('User can have access to Salmon data', async () => {
            await salmonTrack.getSalmonData('0x7465737400000000000000000000000000000000000000000000000000000000', { from: guest });
        });

        it('Scientist can access salmon location', async () => {
            const scientistSalmonData = await salmonTrack.getSalmonData('0x7465737400000000000000000000000000000000000000000000000000000000', { from: admin });
            assert.equal(scientistSalmonData[scientistSalmonData.length - 1].coordinate_url, 'test.com/coordinates');
        });
    });
});


