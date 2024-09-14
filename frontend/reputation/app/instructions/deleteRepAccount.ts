import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const deleteRepAccount =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputation: anchor.web3.PublicKey,
  data: anchor.web3.PublicKey,
) => {
  // Create reputation account
  const deleteRepTx = await program.methods
    .deleteReputationAccount(
    )
    .accounts({
      authority,
      data,
      reputation,
      payer 
    })
    .rpc();
  return {deleteRepTx} 
}
