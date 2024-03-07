import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Network} from "../../../target/types/network"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Network as Program<Network>;
export const joinANetwork =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  network: anchor.web3.PublicKey,
  parentNetwork: anchor.web3.PublicKey,
  parent: anchor.web3.PublicKey,
  node: anchor.web3.PublicKey,
  initTime: string,
) => {
    
  const [joinEscrow] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('join_escrow'),authority.toBuffer()],
    program.programId
  );
    
  // Create reputation account
  const joinANetworkTx= await program.methods.joinANetwork
    (
      initTime
    )
    .accounts({
      payer, 
      authority,
      network,
      parentNetwork,
      parent,
      node,
      joinEscrow,
    })
    .rpc();
  return {joinANetworkTx,joinEscrow} 
}


