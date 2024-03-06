use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Network {
    authority: Pubkey,
    auth_rep_account: Pubkey, 
    // parent: Vec<>
    // children: 
}
