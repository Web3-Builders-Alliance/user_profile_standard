import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram"
import { Wallet,} from '@project-serum/anchor';

const createRepAccount =  async (
  data: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  dateString: string,
  tokenBacked: boolean,
  w: Wallet,
) => {
  const program = getRepProgram(w as Wallet);
  const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation'),authority.toBuffer()],
    program.programId
  );
  let createRepTx = "" ;
  console.log(program.provider.publicKey)

  if(program.provider.publicKey) {
    if(tokenBacked){
      //create token backed reputation account
      createRepTx = await program.methods
        .createTokenBackedReputationAccount(
          dateString,
        )
        .accounts({
          data,
          authority,
          reputation,
          payer 
        })
        .rpc();
    }
    // Create non token backed reputation account
    createRepTx = await program.methods
      .createNonTokenBackedReputationAccount(
        dateString,
      )
      .accounts({
        data,
        authority,
        reputation,
        payer,
      })
      .rpc();
  }
  return {createRepTx, reputation} 
}

export default createRepAccount
