import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import {Reputation } from "../target/types/reputation"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;


const payer = provider.wallet as anchor.Wallet;
const secret = "password" 

const createRepAccount = async () => {
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

describe('Create reputation account', () => {	
  it('Initializes User reputation account !', async () => {
    //create payerd
    
    const {tx , reputation} = await createRepAccount();

    console.log('\n\n\n ============= CREATE REPUTATION ACCOUNT  ===============\n\n');
    console.log(`Created the user reputation account transaction link: ${tx}`);
    const rep  = await program.account.reputation.fetch(reputation);
    console.log(`\nSources count is : ${rep.sourcesCount.toString()}`);
    assert.equal(rep.sourcesCount.toNumber(), 0 , 'source count should be zero') ;
    console.log(`\nAttached account ${rep.attachedAccount.toString()}\n`);
    assert.equal(rep.attachedAccount.toString(), payer.publicKey.toString(), "publick key of attached account not same as payer");
  });

})



