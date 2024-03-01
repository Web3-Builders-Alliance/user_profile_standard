import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Network} from "../../../target/types/network";
import {Reputation } from "../../../target/types/reputation";
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const rep_program = anchor.workspace.Reputation as Program<Reputation>;
const program = anchor.workspace.Network as Program<Network>;

export const createAccount = async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputation: anchor.web3.PublicKey,
) => {
  const [network] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('network'),authority.toBuffer()],
    program.programId
  );
  // Create reputation account
  const createAccountTx = await program.methods
    .createAccount(
    )
    .accounts({
      payer,
      authority,
      network,
      reputation,
      reputationProgram: rep_program.programId,
    })
    .rpc();
  return {createAccountTx, network} 
}

