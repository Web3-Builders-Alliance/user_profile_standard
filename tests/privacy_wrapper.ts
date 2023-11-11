// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { PrivacyWrapper} from "../target/types/privacy_wrapper";
//
// // Configure the client to use the local cluster.
// 	const provider = anchor.AnchorProvider.env();
// 	anchor.setProvider(provider);
// 	const program = anchor.workspace.PrivacyWrapper as Program<PrivacyWrapper>;
//   
//
// describe('user_profile_standard', () => {	
//    it('Initialized the from account !', async () => {
// 			//create payer
// 			let payer = provider.wallet as anchor.Wallet;
// 			// Create from acount
// 			const [from] = anchor.web3.PublicKey.findProgramAddressSync(
// 				[Buffer.from('from'), payer.publicKey.toBuffer()],
// 				program.programId
// 			);
//       const tx = await program.methods
// 				.initializeUserFive()
// 				.accounts({
// 					from,
// 			})
// 			.rpc();
//       console.log('Your transaction signature created user account', tx);
// 			let fm = await program.account.fromFiveU8.fetch(from);
// 			console.log('The private user demo from account is ?? ', fm );
//
// 		});
//
// })
//
//
// describe('user_profile_standard', () => {
//   it('Copies the fields from account A to account B!', async () => {
// 		//create payer
// 		let payer = provider.wallet as anchor.Wallet;
// 		// Create from acount
// 		const [from] = anchor.web3.PublicKey.findProgramAddressSync(
// 			[Buffer.from('from'), payer.publicKey.toBuffer()],
// 			program.programId
// 		);
// 		//profile account
// 		const [fiveU8] = anchor.web3.PublicKey.findProgramAddressSync(
// 			[Buffer.from('five'), payer.publicKey.toBuffer()],
// 			program.programId
// 		);
// 		const tx = await program.methods
// 			.initialize([1, 2, null, null, null])
// 			.accounts({
// 				five: fiveU8,
// 				from,
// 			})
// 			.rpc();
// 		console.log('Your transaction signature', tx);
// 		let fv = await program.account.fiveU8.fetch(fiveU8);
// 		console.log('the public five acount is now ??', fv);
// 	})
//
// })
//
