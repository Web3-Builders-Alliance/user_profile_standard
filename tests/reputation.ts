import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import {Reputation } from "../target/types/reputation"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;


describe('user_profile_standard', () => {	
  it('Initializes User reputation account !', async () => {
    //create payerd
    const payer = provider.wallet as anchor.Wallet;
    const secret = "password" 

    // Create profile account
    const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('reputation'),Buffer.from(secret)],
      program.programId
    );

    const tx = await program.methods
      .createReputationAccount(
      )
      .accounts({
        reputation,
        payer
      })
      .rpc();

    console.log('\n\n\n ============= CREATE REPUTATION ACCOUNT  ===============\n\n\n');
    console.log(`Created the user reputation account transaction link: ${tx}`);
    // const rep  = await program.account.reputation.fetch(reputation);
    // console.log(`\nYour rep account is: ${rep}\n`);
    //    assert.equal(rep.sourcers, [], 'sources are not empty') ;
    //    assert.equal(rep.attachedAccount, payer, "publick key of attached account not same as payer");

  });

})



