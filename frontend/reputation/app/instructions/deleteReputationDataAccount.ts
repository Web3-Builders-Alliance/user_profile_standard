import * as anchor from "@coral-xyz/anchor";
import { Wallet,} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"

const deleteReputationDataAccount =  async (
  payer: anchor.web3.PublicKey,
  data: anchor.web3.PublicKey,
  w: Wallet
) => {

  const program = getRepProgram(w as Wallet);
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
export default deleteReputationDataAccount;
