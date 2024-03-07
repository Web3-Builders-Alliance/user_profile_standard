import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Network} from "../../../target/types/network"
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Network as Program<Network>;

export const addToNetwork =  async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  nodeAuthority: anchor.web3.PublicKey,
  childNetworkAccount: anchor.web3.PublicKey,
  networkAccount: anchor.web3.PublicKey,
  child: anchor.web3.PublicKey,
  joinEscrow: anchor.web3.PublicKey,
  node: anchor.web3.PublicKey,
) => {
  const [linkData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("link_data"), node.toBuffer(), child.toBuffer(), authority.toBuffer()],
    program.programId
  )

  // Create reputation account
  const addToNetworkTx = await program.methods.addToNetwork
    (
    )
    .accounts({
      payer, 
      authority,
      nodeAuthority,
      child,
      networkAccount,
      node,
      childNetworkAccount,
      joinEscrow,
      linkData,
    })
    .rpc();
  return {addToNetworkTx,linkData} 
}


