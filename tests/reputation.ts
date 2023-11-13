import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import {Reputation } from "../target/types/reputation"
import {createSourceAccount} from "./instructions/createSourceAccount"
import {initializeSourceDataAccount} from "./instructions/initializeSourceDataAccount"
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
    const {createRepTx,reputation} = await createRepAccount(payer.payer.publicKey,payer.payer.publicKey);
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
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

    const {createRepTx,reputation} = await createRepAccount(payer.payer.publicKey,authority.publicKey);
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
    //create reputation account to use to create source account 
    const rep  = await program.account.reputation.fetch(reputation);
    console.log(`\nThe user inititial source count is:${rep.sourcesCount.toNumber()}\n`)
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    const {source, createSourceTx} = await createSourceAccount(reputation,authority.publicKey,payer.payer.publicKey,sourceName, ) ;
    console.log(`Created the user source account transaction link: ${createSourceTx}`);
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
    const {createRepTx,reputation} = await createRepAccount(payer.payer.publicKey,authority.publicKey);
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
    const rep  = await program.account.reputation.fetch(reputation);
    console.log(`\nThe user inititial source count is:${rep.sourcesCount.toNumber()}\n`)
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    const {source, createSourceTx } = await createSourceAccount(reputation,authority.publicKey,payer.payer.publicKey,sourceName, ) ;
    console.log(`Created the user source account transaction link: ${createSourceTx}`);
    console.log(`\nThe source account is:${source}\n`)

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
    const {addPointstx} = await addPoints(bonus, source,payer.payer.publicKey,authority.publicKey,reputation, sourceName) ;
    const sc2 = await program.account.source.fetch(source);
    console.log(`Added reputation transaction link: ${addPointstx}`);
    console.log(`\nSource points now : ${sc2.points.toString()}\n`);
    assert.equal(sc2.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc2.points, 3 , "source points should be 3");
    const penalty = 1 ;
    const {subtractPointsTx} = await subtractPoints(penalty,source,payer.payer.publicKey,authority.publicKey,reputation,sourceName) ;
    const sc3 = await program.account.source.fetch(source);
    console.log(`\nSource points now equal : ${sc3.points.toString()}\n`);
    console.log(`Removed reputation transaction link: ${subtractPointsTx}`);
    assert.equal(sc3.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc3.points, 2 , "source points should be 2");

  })
})
describe('\n\n\n============= CREATE MULTIPLE SOURCE ACCOUTS ==================\n\n', () => {
  it("Adds and subtracts points from source accounts", async ()=> {
    const sourceNames = ["SourceOne", "SourceTwo", "SourceThree" , "SourceFour"];
    const authority = new anchor.web3.Keypair()
    //create reputation account to use to create source ac.toString)
    const {createRepTx,reputation} = await createRepAccount(payer.payer.publicKey,authority.publicKey);
    for (const sourceName of  sourceNames) {
      const {source, createSourceTx } = await createSourceAccount(reputation,authority.publicKey,payer.payer.publicKey,sourceName, ) ;
      console.log(`Created the user source account transaction link: ${createSourceTx}`);
      console.log(`\nThe source account is:${source}\n`)
      // source. 
      const sc = await program.account.source.fetch(source);
      console.log(`\nSource account name is: ${sc.name}\n`);
      console.log(`\nSource points: ${sc.points}\n`);
      assert.equal(sc.name , sourceName , `source name should be ${sourceName}`) ;
      assert.equal(sc.points, 0 , "source points should be 0");
    }
    //search for all user source accounts 
    console.log("\ncan search for all the created user source accounts\n");
    const accounts = await program.account.source.all([{memcmp:{
      offset: 8,
      bytes: authority.publicKey.toBase58()
    }}]) ;
    for (const account of accounts) {
      console.log(`${account.account.name}`)
    }
  })
})
describe("\n\n\n=========== Creates Source Data Account =============\n\n\n", () => {
  it("", async ()=> {
    const sourceName = "sourcedata"
    const authority = new anchor.web3.Keypair()
    const {sourceDataTx,sourceData} = await initializeSourceDataAccount(payer.payer.publicKey,authority.publicKey,sourceName) ;
    console.log(`created source data account: ${sourceDataTx}`)
    console.log(`\nThe source data account is:${sourceData}\n`)
      // source. 
    const sd = await program.account.sourceData.fetch(sourceData);
    console.log(`\nSource account name is: ${sd.sourceName}\n`);
      console.log(`\nSource points: ${sd.sourceCount}\n`);
      console.log(`\nSource authority: ${sd.sourceAuthority}\n`);
      assert.equal(sd.sourceName , sourceName , `source name should be ${sourceName}`) ;
      assert.equal(sd.sourceCount.toNumber(), 0 , "source count should be 0");
      assert.equal(sd.sourceAuthority.toString(), authority.publicKey.toString() , `source authority should be ${authority.publicKey.toString()} `);
  })  
})
describe("\n\n\n=========== Deletes User Accounts =============\n\n\n", () => {
  
})
