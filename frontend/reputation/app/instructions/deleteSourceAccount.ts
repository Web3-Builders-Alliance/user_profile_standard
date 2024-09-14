import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram"

export const deleteSourceAccount = async (
  reputation: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  sourceName: string
  w: Wallet
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

