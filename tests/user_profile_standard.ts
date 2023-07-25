import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { UserProfileStandard } from "../target/types/user_profile_standard";

describe('user_profile_standard', () => {
	// Configure the client to use the local cluster.
	let provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);

	const program = anchor.workspace.UserProfileStandard as Program<UserProfileStandard>;

	it('Creates profile!', async () => {
		// Add your test here.
		const tx = await program.methods.createProfile().accounts({}).rpc();
		console.log('Your transaction signature', tx);
	});
});
