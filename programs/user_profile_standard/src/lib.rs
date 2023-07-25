use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod user_profile_standard {
    use super::*;
    pub fn create_profile(ctx: Context<CreateProfile>) -> Result<()> {
        Ok(())
    }

    pub fn create_socials(ctx: Context<CreateSocials>) -> Result<()> {

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProfile  {
    // pub profile: Account<'info,Profile> ,
    // pub system_program: Account<'info, Socials> ,
}

#[derive(Accounts)]
pub struct CreateSocials  {
    // pub profile: Account<'info,Profile> ,
    // pub system_program: Account<'info, Socials> ,
}


#[account]
#[derive(InitSpace)]
pub struct Socials {
    #[max_len(300)]
    pub linked_in: String ,
    #[max_len(300)]
    pub  x: String ,
    #[max_len(300)]
    pub facebook: String,
    #[max_len(300)]
    pub instagram: String, 
}

#[account]
#[derive(InitSpace)]
pub struct Profile {
    #[max_len(35)]
    pub first_name: String ,
    #[max_len(35)]
    pub middle_name: String ,
    #[max_len(35)]
    pub last_name: String,
    #[max_len(300)]
    pub picture_uri: String,
    #[max_len(200)]
    pub email_address: String,
    #[max_len(300)]
    pub git_account: String ,
    #[max_len(300)]
    pub website: String,  
}

