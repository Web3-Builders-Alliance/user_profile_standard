use anchor_lang::prelude::*;

declare_id!("FqmB85Gb6tJPYgft7iksH1F7K4CjYS42UbGcAANccWm5");

#[program]
pub mod user_profile_standard {
    use super::*;
    pub fn create_profile(
        ctx: Context<CreateProfile>, 
        secret: String,
        first_name: String ,
        middle_name: Option<String> ,
        last_name: String,
        picture_uri: Option<String>,
        email_address: String,
        git_account: Option<String> ,
        website: Option<String>
    ,) -> Result<()> { 

        ctx.accounts.profile.first_name = first_name ;
        ctx.accounts.profile.last_name = last_name ;

        Ok(())
    }

    pub fn create_socials(ctx: Context<CreateSocials>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProfile  <'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(init, payer=payer, seeds=[b"profile", payer.key.as_ref()], bump, space = 8 + Profile::INIT_SPACE)]
    pub profile: Account<'info,Profile> ,
    pub system_program: Program<'info, System> ,
}

#[derive(Accounts)]
pub struct CreateSocials <'info> {
    pub profile: Account<'info,Profile> ,
    pub system_program: Program <'info,System> ,
}


#[account]
#[derive(InitSpace)]
pub struct Socials {
    #[max_len(300)]
    linked_in: String ,
    #[max_len(300)]
    x: String ,
    #[max_len(300)]
    facebook: String,
    #[max_len(300)]
    instagram: String, 
}

#[account]
#[derive(InitSpace)]
pub struct Profile {
    #[max_len(35)]
    first_name: String ,
    #[max_len(35)]
    middle_name: String ,
    #[max_len(35)]
    last_name: String,
    #[max_len(300)]
    picture_uri: String,
    #[max_len(200)]
    email_address: String,
    #[max_len(300)]
    git_account: String ,
    #[max_len(300)]
    website: String,  
}

 
