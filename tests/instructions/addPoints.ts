import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const addPoints  = async (
  bonus: number,
  source: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputation: anchor.web3.PublicKey,
  sourceName: string
) => {
  // Create reputation account
  const tx3 = await program.methods
    .addReputation(
      sourceName,
      bonus
    )
    .accounts({
      authority,
      reputation,
      source,
      payer
    })
    .rpc();
  return {tx3} 
}

