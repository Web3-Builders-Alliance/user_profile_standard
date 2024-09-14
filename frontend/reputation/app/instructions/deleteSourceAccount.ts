import * as anchor from "@coral-xyz/anchor";
import getRepProgram from "../utils/getRepProgram";
import { Wallet,} from '@project-serum/anchor';

const deleteSourceAccount = async (
  authority: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  sourceName: string,
  w: Wallet
) => {
  const program = getRepProgram(w as Wallet);

  const [reputation] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation'),authority.toBuffer()],
    program.programId
  );
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
export default deleteSourceAccount;
