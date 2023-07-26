// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { UserProfileStandard } from "../target/types/user_profile_standard";

// describe('user_profile_standard', () => {
// 	// Configure the client to use the local cluster.
// 	let provider = anchor.AnchorProvider.env();
// 	anchor.setProvider(provider);

// 	const program = anchor.workspace.UserProfileStandard as Program<UserProfileStandard>;

// 	it('Creates profile!', async () => {
//     //create payer 
//     let payer = provider.wallet as anchor.Wallet;
// 		//profile account 
//     const [profile] = anchor.web3.PublicKey.findProgramAddressSync(
// 			[Buffer.from('profile'), payer.publicKey.toBuffer()],
// 			program.programId ,
// 		);
// 		const tx = await program.methods
// 			.createProfile(  
//         "Victor" ,
//         null ,
//         "Kwasara",
//         null,
//         "kwasaravictort@gmail.com",
//         null,
//         null
//         )
// 			.accounts({
// 				profile,
// 			})
// 			.rpc();
// 		console.log('Your transaction signature', tx);
    
//     let pr = await program.account.profile.fetch(profile) ;
//     console.log("The profile account is ?? ", pr) ;
//     console.log('Is the name accessible => ?  : ', pr.firstName); 
//     console.log("Is the surname accessible => ?  : ", pr.lastName ); 
//     console.log('Is the email accessible => ?  : ', pr.emailAddress); 

// 	});
// });
