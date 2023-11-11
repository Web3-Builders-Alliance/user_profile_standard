import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import {Reputation } from "../target/types/reputation"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;


const payer = provider.wallet as anchor.Wallet;
// const secret = "password" 

const createRepAccount = async (secret) => {
  // Create reputation account
  const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation'),Buffer.from(secret)],
    program.programId
  );
  const tx = await program.methods
    .createReputationAccount(
      secret
    )
    .accounts({
      reputation,
      payer: payer.payer.publicKey
    })
    .rpc();
  return { reputation, tx } 
}

const createSourceAccount = async (reputation: anchor.web3.Keypair ) => {
  // Create source account
  const [dummy_source] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_name'),reputation.publicKey.toBuffer()],
    program.programId
  );
  const tx = await program.methods
    .createSourceAccount(
    )
    .accounts({
      reputation,
      dummy_source,
      payer: payer.payer.publicKey,

    })
    .rpc();
  return { reputation, tx } 
}

describe('\n\n\n============== CREATE REPUTATION ACCOUNT  =================\n\n', () => {	
  it('Initializes User reputation account !', async () => {
    const secret = "password" ;
    //create payerd
    const {tx , reputation} = await createRepAccount(secret);
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
    const secret = "addsources" ;
    //create reputation account to use to create source account 
    const {tx , reputation} = await createRepAccount(secret);
    const rep  = await program.account.reputation.fetch(reputation);
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    const {source, tx2 } = await createSourceAccount() ;
    console.log(`Created the user source account transaction link: ${tx}`);
    console.log(`\n\nThe source account is:${source}\n`)

    const reloadRep  = await program.account.reputation.fetch(reputation);
    console.log(`\n The user source count is now:${reloadRep.sourcesCount.toNumber()}\n`)
    assert.equal(reloadRep.sourcesCount.toNumber(), 1 , 'source count should be one') ;
    assert.equal(reloadRep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");

    // source. 

  })

})


