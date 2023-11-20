import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const deleteReputationDataAccount =  async (
  data: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
) => {
  // Create reputation account
  const deleteRepTx = await program.methods
    .deleteReputationDataAccount(
    )
    .accounts({
      data,
      payer 
    })
    .rpc();
  return {deleteRepTx} 
}

