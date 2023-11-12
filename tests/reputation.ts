import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import {Reputation } from "../target/types/reputation"
import {createSourceAccount} from "./instructions/createSourceAccount"
import {createRepAccount} from "./instructions/createRepAccount"
import {addPoints} from "./instructions/addPoints"
import {subtractPoints} from "./instructions/subtractPoints"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;

const payer = provider.wallet as anchor.Wallet;

describe('\n\n\n============== CREATE REPUTATION ACCOUNT  =================\n\n', () => {	
  it('Initializes User reputation account !', async () => {
     //create payerd
    const {tx,reputation} = await createRepAccount(payer.payer.publicKey,payer.payer.publicKey);
    console.log(`Created the user reputation account transaction link: ${tx}`);
    const rep  = await program.account.reputation.fetch(reputation);
    console.log(`\nSources count is : ${rep.sourcesCount.toString()}`);
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    console.log(`\nAttached account ${rep.attachedAccount.toString()}\n`);
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");
  });
})

describe('\n\n\n============= CREATE A SOURCE ACCOUNT =====================\n\n', () => {
  it("creates source account", async ()=> {
    const sourceName = "dummy" ;
    const authority = new anchor.web3.Keypair()

    const {tx,reputation} = await createRepAccount(payer.payer.publicKey,authority.publicKey);
    console.log(`Created the user reputation account transaction link: ${tx}`);
    //create reputation account to use to create source account 
    const rep  = await program.account.reputation.fetch(reputation);
    console.log(`\nThe user inititial source count is:${rep.sourcesCount.toNumber()}\n`)
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    const {source, tx2 } = await createSourceAccount(reputation,authority.publicKey,payer.payer.publicKey,sourceName, ) ;
    console.log(`Created the user source account transaction link: ${tx2}`);
    console.log(`\n\nThe source account is:${source}\n`)

    const reloadRep  = await program.account.reputation.fetch(reputation);
    console.log(`\nThe user source count is now:${reloadRep.sourcesCount.toNumber()}\n`)
    assert.equal(reloadRep.sourcesCount.toNumber(), 1 , 'source count should be one') ;
    assert.equal(reloadRep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    // source. 
    const sc = await program.account.source.fetch(source);
    console.log(`\nSource account name is: ${sc.name}\n`);
    console.log(`\nSource points: ${sc.points}\n`);
    assert.equal(sc.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc.points, 0 , "source points should be 0");
  })
})


describe('\n\n\n============= UPDATE USER SOURCE ACCOUNT ==================\n\n', () => {
  it("Adds and subtracts points from source accounts", async ()=> {
    const sourceName = "dummy2" ;
    const authority = new anchor.web3.Keypair()

    //create reputation account to use to create source account 
    const {tx,reputation} = await createRepAccount(payer.payer.publicKey,authority.publicKey);
    console.log(`Created the user reputation account transaction link: ${tx}`);
    const rep  = await program.account.reputation.fetch(reputation);
    console.log(`\nThe user inititial source count is:${rep.sourcesCount.toNumber()}\n`)
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    const {source, tx2 } = await createSourceAccount(reputation,authority.publicKey,payer.payer.publicKey,sourceName, ) ;
    console.log(`Created the user source account transaction link: ${tx2}`);
    console.log(`\n\nThe source account is:${source}\n`)

    const reloadRep  = await program.account.reputation.fetch(reputation);
    console.log(`\nThe user source count is now:${reloadRep.sourcesCount.toNumber()}\n`)
    assert.equal(reloadRep.sourcesCount.toNumber(), 1 , 'source count should be one') ;
    assert.equal(reloadRep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    // source. 
    const sc = await program.account.source.fetch(source);
    console.log(`\nSource account name is: ${sc.name}\n`);
    console.log(`\nSource points: ${sc.points}\n`);
    assert.equal(sc.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc.points, 0 , "source points should be 0");

    const bonus = 3 ;
    const {tx3} = await addPoints(bonus, source,payer.payer.publicKey,authority.publicKey,reputation, sourceName) ;
    const sc2 = await program.account.source.fetch(source);
    console.log(`Added reputation transaction link: ${tx3}`);
    console.log(`\nSource points now : ${sc2.points.toString()}\n`);
    assert.equal(sc2.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc2.points, 3 , "source points should be 3");

    const penalty = 1 ;

    const {tx4} = await subtractPoints(penalty,source,payer.payer.publicKey,authority.publicKey,reputation,sourceName) ;
    const sc3 = await program.account.source.fetch(source);
    console.log(`\nSource points now equal : ${sc3.points.toString()}\n`);
    console.log(`Removed reputation transaction link: ${tx4}`);
    assert.equal(sc3.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc3.points, 2 , "source points should be 2");

  })
})
