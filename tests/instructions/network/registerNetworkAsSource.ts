import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {Network} from "../../../target/types/network";
import {Reputation } from "../../../target/types/reputation";
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const rep_program = anchor.workspace.Reputation as Program<Reputation>;
const program = anchor.workspace.Network as Program<Network>;

export const registerNetworkAsReputationSource = async (
  payer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
  reputationData: anchor.web3.PublicKey,
  sourceName: string,
) => {
  const [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_data'),Buffer.from(sourceName)],
    rep_program.programId
  );
  // Create reputation account
  const registerReputationAsSourceTx = await program.methods.registerAsSource(
    sourceName
    )
    .accounts({
      payer,
      authority,
      sourceData,
      reputationData,
      reputationProgram: rep_program.programId,
    })
    .rpc();
  return {registerReputationAsSourceTx, sourceData} 
}

