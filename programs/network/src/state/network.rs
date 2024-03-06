use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Network {
    authority: Pubkey,
    auth_rep_account: Pubkey, 
    // parent: Vec<>
    // children: 
}

impl Network {

    pub fn initialize_account(&mut self, authority: Pubkey, auth_rep_account: Pubkey) -> Result<()> {
        self.auth_rep_account = auth_rep_account;
        self.authority = authority ;
        Ok(())
    }

}
