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
  reputatioinData: anchor.web3.PublicKey,
  sourceName: string,
) => {
  const [reputationSourceData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_data'),Buffer.from(sourceName)],
    rep_program.programId
  );
  // Create reputation account
  const registerRputationAsSourceTx = await program.methods.register_network_as_reputation_source(
    sourceName
    )
    .accounts({
      payer,
      authority,
      sourceData,
      reputation,
      reputatioinData,
      reputationProgram: rep_program.programId,
    })
    .rpc();
  return {registerRputationAsSourceTx, reputationSourceData} 
}

