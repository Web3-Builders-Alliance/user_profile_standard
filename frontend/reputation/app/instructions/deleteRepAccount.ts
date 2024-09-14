import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram"
import { Wallet,} from '@project-serum/anchor';
const deleteRepAccount =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  data: anchor.web3.PublicKey,
  w: Wallet
) => {
 const program = getRepProgram(w as Wallet);
  // Create reputation account

  const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation'),authority.toBuffer()],
    program.programId
  );
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

export default deleteRepAccount;
