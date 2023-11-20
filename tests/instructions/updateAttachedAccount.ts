import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const updateAttachedAccount =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputation: anchor.web3.PublicKey
) => {
  // Create reputation account
  const updatedAttachedAccountTx = await program.methods
    .UpdateAttachedAccount(
    )
    .accounts({
      authority,
      reputation,
      payer 
    })
    .rpc();
  return {updatedAttachedAccountTx} 
}

