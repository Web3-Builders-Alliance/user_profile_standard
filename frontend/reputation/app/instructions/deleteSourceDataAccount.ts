import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram"
import { Wallet,} from '@project-serum/anchor';

const deleteSourceDataAccount = async (
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
   const deleteSourceDataTx = await program.methods
    .deleteSourceDataAccount(
      sourceName
    )
    .accounts({
      sourceData,
      data,
      authority,
      payer,
    })
    .rpc();
  return { deleteSourceDataTx} 
}
 export default deleteSourceDataAccount
