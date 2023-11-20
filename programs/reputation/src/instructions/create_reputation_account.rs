use anchor_lang::prelude::*;
use crate::state::{reputation::Reputation, reputation_data::ReputationData};
pub fn create_reputation_account(ctx: Context<CreateReputation>, ) -> Result<()> {
    ctx.accounts.reputation.create(ctx.accounts.authority.key())
}
#[derive(Accounts)]
#[instruction()]
pub struct CreateReputation<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(init, payer=payer, seeds=[b"reputation",authority.key().as_ref()], bump, space= 8 + Reputation::INIT_SPACE)]
    reputation: Account<'info , Reputation> ,    
    #[account(mut,seeds=[b"reputation_data"], bump,)]
    data: Account<'info,ReputationData>,
    system_program: Program<'info, System>
}

