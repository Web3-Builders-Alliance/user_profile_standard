// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import {Network} from "../../../target/types/network";
// import {Reputation } from "../../../target/types/reputation";
// const provider = anchor.AnchorProvider.env();
// anchor.setProvider(provider);
// const rep_program = anchor.workspace.Reputation as Program<Reputation>;
// const program = anchor.workspace.Network as Program<Network>;
//
// export const registerAsSource = async (
//   payer: anchor.web3.PublicKey,
//   authority: anchor.web3.PublicKey,
//   reputationData: anchor.web3.PublicKey,
// ) => {
//   const sourceName = "network" ;
//   const [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
//     [Buffer.from('source_data'),Buffer.from(sourceName)],
//     program.programId
//   );
//   // Create reputation account
//   const registerAsSourceTx = await program.methods
//     .registerAsSource(
//      sourceName 
//     )
//     .accounts({
//       payer,
//       authority,
//       sourceData,
//       reputationData,
//       reputationProgram: rep_program.programId,
//     })
//     .rpc();
//   return {registerAsSourceTx, sourceData} 
// }
//
