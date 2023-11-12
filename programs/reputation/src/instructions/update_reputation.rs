use anchor_lang::prelude::* ;
use crate::state::{reputation::Reputation,source::Source} ;
pub fn add_reputation (ctx: Context<UpdateSource>,source_name: String, bonus: u8) -> Result<()> {
    ctx.accounts.source.add_points(bonus)
}
pub fn subtract_reputation(ctx: Context<UpdateSource>,source_name: String, penalty: u8 ) -> Result<()> {
    ctx.accounts.source.subtract_points(penalty) 
} 
#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct UpdateSource<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut, seeds=[b"reputation", authority.key().as_ref()], bump,)]
    reputation: Account<'info , Reputation> ,    
    #[account(mut,seeds=[b"source", source_name.as_bytes(), authority.key().as_ref()],bump)]
    source: Account<'info , Source> ,    
}

