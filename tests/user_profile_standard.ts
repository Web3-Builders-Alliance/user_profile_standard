import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { UserProfileStandard} from "../target/types/user_profile_standard";

// Configure the client to use the local cluster.
	const provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);
	const program = anchor.workspace.UserProfileStandard as Program<UserProfileStandard>;
  

describe('user_profile_standard', () => {	
   it('Initialized the from account !', async () => {
			//create payerd
			const payer = provider.wallet as anchor.Wallet;
      const  secret = "hello world";
    
			// Create profile account
			const [profile] = anchor.web3.PublicKey.findProgramAddressSync(
				[Buffer.from('profile'),Buffer.from(secret) ],
				program.programId
			);

    const  firstName ="hello";
    const  middle_name ="hello";
    const  last_name = "hello";
    const  picture_uri="hello";
    const  email_addres="hello";
    const  git_account= "hello";
    const  website= "hello";

      const tx = await program.methods
        .createProfile(
          secret,
          firstName,
          middle_name,
          last_name,
          picture_uri, 
          email_addres,
          git_account, 
          website 
        )
				.accounts({
				  profile
		  	})
			  .rpc();

      
      console.log('Your transaction signature created user account', tx);
			const prof  = await program.account.profile.fetch(profile);
			console.log('Fetch created account using account ID', prof );  
			const  accounts = await program.account.profile.all();
			console.log('All profile accounts owned by the program ==> ', accounts );

		});

})


describe('user_profile_standard', () => {
})


