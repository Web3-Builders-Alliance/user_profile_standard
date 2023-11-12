import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;

export const createRepAccount =  async (payer: anchor.web3.PublicKey,authority: anchor.web3.PublicKey) => {
const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('reputation'),authority.toBuffer()],
  program.programId
);
  // Create reputation account
  const tx = await program.methods
    .createReputationAccount(
    )
    .accounts({
      authority,
      reputation,
      payer 
    })
    .rpc();
  return {tx, reputation} 
}

