import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const initializeReputationDataAccount = async (
  payer: anchor.web3.PublicKey,
  data:anchor.web3.PublicKey, 
) => {
  // Create reputation data account
  const reputationDataTx = await program.methods
    .initializeReputationDataAccount(
    )
    .accounts({
      data,
      payer,
    })
    .rpc();
  return { reputationDataTx } 
}
