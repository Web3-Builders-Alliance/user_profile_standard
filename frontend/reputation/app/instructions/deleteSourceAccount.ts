import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const deleteSourceAccount = async (
  reputation: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  sourceName: string
) => {
  // Create source account
  const [source] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source'), Buffer.from(sourceName),authority.toBuffer()],
    program.programId
  );
  const deleteSourceTx = await program.methods
    .deleteSourceAccount(
      sourceName,
    )
    .accounts({
      authority,
      reputation,
      source,
      payer,
    })
    .rpc();
  return {deleteSourceTx} 
}

