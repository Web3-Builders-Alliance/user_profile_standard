import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import {Reputation } from "../target/types/reputation"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;


const payer = provider.wallet as anchor.Wallet;
// const secret = "password" 
const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('reputation'),payer.publicKey.toBuffer()],
  program.programId
);

const addPoints = async (bonus: number, source: anchor.web3.PublicKey, sourceName: string) => {
  // Create reputation account
  const tx3 = await program.methods
    .addReputation(
     sourceName,
     new anchor.BN(bonus)
    )
    .accounts({
      reputation,
      source,
      payer: payer.payer.publicKey
    })
    .rpc();
  return {tx3} 
}

const subtractPoints = async (penalty: number, source: anchor.web3.PublicKey, sourceName: string) => {
  // Create reputation account
  const tx4 = await program.methods
    .subtractReputation(
      sourceName,
      new anchor.BN(penalty)
    )
    .accounts({
      reputation,
      source,
      payer: payer.payer.publicKey
    })
    .rpc();
  return {tx4} 
}
const createRepAccount = async () => {
  // Create reputation account
  const tx = await program.methods
    .createReputationAccount(
    )
    .accounts({
      reputation,
      payer: payer.payer.publicKey
    })
    .rpc();
  return {tx} 
}

const createSourceAccount = async (reputation: anchor.web3.PublicKey, sourceName: string) => {
  // Create source account
  const [source] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source'), Buffer.from(sourceName),reputation.toBuffer()],
    program.programId
  );
  const tx2 = await program.methods
    .createSourceAccount(
      sourceName,
    )
    .accounts({
      reputation,
      source,
      payer: payer.payer.publicKey,
    })
    .rpc();
  return { source , tx2 } 
}

describe('\n\n\n============== CREATE REPUTATION ACCOUNT  =================\n\n', () => {	
  it('Initializes User reputation account !', async () => {
    //create payerd
    const {tx } = await createRepAccount();
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
    //create reputation account to use to create source account 
    const rep  = await program.account.reputation.fetch(reputation);
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    const {source, tx2 } = await createSourceAccount(reputation ,sourceName ) ;
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
    assert.equal(sc.points.toNumber(), 0 , "source points should be 0");
  })

})


describe('\n\n\n============= UPDATE USER SOURCE ACCOUNT ==================\n\n', () => {
  it("Adds and subtracts points from source accounts", async ()=> {
    const sourceName = "dummy2" ;
    //create reputation account to use to create source account 
    const rep  = await program.account.reputation.fetch(reputation);
    assert.equal(rep.sourcesCount.toNumber(), 1 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    //create source account
    const {source, tx2 } = await createSourceAccount(reputation ,sourceName ) ;

    const reloadRep  = await program.account.reputation.fetch(reputation);
    assert.equal(reloadRep.sourcesCount.toNumber(), 2 , 'source count should be one') ;
    assert.equal(reloadRep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    // source. 
    const sc = await program.account.source.fetch(source);
    assert.equal(sc.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc.points.toNumber(), 0 , "source points should be 0");

    const bonus = 3 ;
    const {tx3} = await addPoints(bonus, source, sourceName) ;
    const sc2 = await program.account.source.fetch(source);
    console.log(`Added reputation transaction link: ${tx3}`);
    console.log(`\nSource points now equal : ${sc2.points.toString()}\n`);
    assert.equal(sc2.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc2.points.toNumber(), 3 , "source points should be 3");

    const penalty = 1 ;

    const {tx4} = await subtractPoints(penalty,source, sourceName) ;
    const sc3 = await program.account.source.fetch(source);
    console.log(`\nSource points now equal : ${sc3.points.toString()}\n`);
    console.log(`Removed reputation transaction link: ${tx4}`);
    assert.equal(sc3.name , sourceName , `source name should be ${sourceName}`) ;
    assert.equal(sc3.points.toNumber(), 2 , "source points should be 2");

  })


})
