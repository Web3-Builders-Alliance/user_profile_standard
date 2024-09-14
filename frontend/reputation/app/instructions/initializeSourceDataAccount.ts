import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram"

export const initializeSourceDataAccount = async (
  data: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  sourceName: string,
  w: Wallet
) => {
  const program = getRepProgram(w as Wallet);

  // Create source account
  const [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_data'), Buffer.from(sourceName)],
    program.programId
  );
  const sourceDataTx = await program.methods
    .initializeSourceDataAccount(
      sourceName
    )
    .accounts({
      sourceData,
      data,
      authority,
      payer,
    })
    .rpc();
  return { sourceData , sourceDataTx } 
}
