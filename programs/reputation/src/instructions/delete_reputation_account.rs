use anchor_lang::prelude::*;
use crate::state::{reputation::Reputation,reputation_data::ReputationData};
pub fn delete_reputation_account(ctx: Context<DeleteReputation>, ) -> Result<()> {
    ctx.accounts.data.remove_rep_account()?;
    Ok(())
}
#[derive(Accounts)]
#[instruction()]
pub struct DeleteReputation<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut,close=payer,seeds=[b"reputation",authority.key().as_ref()], bump, )]
    reputation: Account<'info , Reputation> ,    
    #[account(mut,seeds=[b"reputation_data"], bump,)]
    data: Account<'info,ReputationData>,
    system_program: Program<'info, System>
}

