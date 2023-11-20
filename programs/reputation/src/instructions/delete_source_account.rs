use anchor_lang::prelude::*;
use crate::state::{source::Source,reputation::Reputation};
pub fn delete_source_account(ctx: Context<DeleteSource>, source_name: String ) -> Result<()> {
    // ctx.accounts.source.create(source_name, ctx.accounts.authority.key(), ctx.accounts.reputation.key())?;
    ctx.accounts.reputation.remove_source()?; 
    // // ctx.accounts.source.bump = ctx.bumps.
    Ok(())
}
#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct DeleteSource<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut, seeds=[b"reputation", authority.key().as_ref()], bump,)]
    reputation: Account<'info , Reputation> ,    
    #[account(mut ,close=payer, seeds=[b"source", source_name.as_bytes(), authority.key().as_ref()], bump,)]
    source: Account<'info , Source> ,    
    system_program: Program<'info, System>
}

