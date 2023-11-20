use anchor_lang::prelude::* ;
use crate::state::{reputation::Reputation};
pub fn change_attached_account(ctx: Context<UpdateReputation>,new_attached_account: Pubkey) -> Result<()> {
    ctx.accounts.reputation.change_attached_account(new_attached_account)
} 
#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut, seeds=[b"reputation", authority.key().as_ref()], bump,)]
    reputation: Account<'info,Reputation> ,    
}
 
