import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Reputation } from "../../target/types/reputation"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Reputation as Program<Reputation>;
export const deleteSourceDataAccount = async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  sourceName: string
) => {
  // Create source account
  const [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_data'), Buffer.from(sourceName)],
    program.programId
  );
  const deleteSourceDataTx = await program.methods
    .deleteSourceDataAccount(
      sourceName
    )
    .accounts({
      sourceData,
      authority,
      payer,
    })
    .rpc();
  return { deleteSourceDataTx} 
}

