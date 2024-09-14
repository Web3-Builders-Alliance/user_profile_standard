import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram"
import { Wallet,} from '@project-serum/anchor';
export const deleteRepAccount =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputation: anchor.web3.PublicKey,
  data: anchor.web3.PublicKey,
  w: Wallet
) => {
 const program = getRepProgram(w as Wallet);
  // Create reputation account
  const deleteRepTx = await program.methods
    .deleteReputationAccount(
    )
    .accounts({
      authority,
      data,
      reputation,
      payer 
    })
    .rpc();
  return {deleteRepTx} 
}
