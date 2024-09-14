import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const subtractPoints = async (
  penalty: number,
  source: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputation:anchor.web3.PublicKey,
  sourceName: string
) => {
  // Create reputation account
  const subtractPointsTx = await program.methods
    .subtractReputation(
      sourceName,
      penalty
    )
    .accounts({
      authority,
       reputation,
      source,
      payer
    })
    .rpc();
  return {subtractPointsTx} 
}
