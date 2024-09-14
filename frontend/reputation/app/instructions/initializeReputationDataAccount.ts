import * as anchor from "@coral-xyz/anchor";
import { Wallet,} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"

const initializeReputationDataAccount = async (
  payer: anchor.web3.PublicKey,
  data:anchor.web3.PublicKey,
  w: Wallet
) => {
  
  const program = getRepProgram(w as Wallet);

  // Create reputation data account
  const initReputationDataTx = await program.methods
    .initializeReputationDataAccount(
    )
    .accounts({
      data,
      payer,
    })
    .rpc();
  return { initReputationDataTx } 
}

export default initializeReputationDataAccount;
