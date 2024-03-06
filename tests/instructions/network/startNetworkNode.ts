import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Network} from "../../../target/types/network"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Network as Program<Network>;
export const startNetworkNode =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  network: anchor.web3.PublicKey,
) => {
  const date= new Date() ;
  const init_date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  const [node] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('node'),authority.toBuffer()],
    program.programId
  );
  // Create reputation account
  const startedNetworkNodeTx= await program.methods.startNetworkNode
    (
      init_date
    )
    .accounts({
      payer,
      authority,
      network,
      node,
    })
    .rpc();
  return {startedNetworkNodeTx, node} 
}


