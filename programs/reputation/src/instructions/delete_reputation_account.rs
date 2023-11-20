use anchor_lang::prelude::*;
use crate::state::reputation::Reputation;
pub fn delete_reputation_account(_ctx: Context<UpdateReputation>, ) -> Result<()> {
    Ok(())
}
#[derive(Accounts)]
#[instruction()]
pub struct UpdateReputation<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut,close=payer,seeds=[b"reputation",authority.key().as_ref()], bump, )]
    reputation: Account<'info , Reputation> ,    
    system_program: Program<'info, System>
}

