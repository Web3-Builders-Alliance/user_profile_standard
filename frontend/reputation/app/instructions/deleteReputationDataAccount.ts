import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const deleteReputationDataAccount =  async (
  payer: anchor.web3.PublicKey,
  data: anchor.web3.PublicKey,
) => {
  // Create reputation account
  const deleteReputationDataTx = await program.methods
    .deleteReputationDataAccount(
    )
    .accounts({
      data,
      payer 
    })
    .rpc();
  return {deleteReputationDataTx} 
}

