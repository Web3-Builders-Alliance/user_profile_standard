use anchor_lang::prelude::*;
use crate::state::{source::Source,reputation::Reputation,};
pub fn create_source_account(ctx: Context<CreateSource>, source_name: String ) -> Result<()> {
    ctx.accounts.source.create(source_name.clone(), ctx.accounts.authority.key(), ctx.accounts.reputation.key())?;
    ctx.accounts.reputation.add_source(source_name)?; 
    // ctx.accounts.source.bump = ctx.bumps.
    Ok(())
}
#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct CreateSource<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut, seeds=[b"reputation", authority.key().as_ref()], bump,)]
    reputation: Account<'info , Reputation> ,    
    #[account(init, payer=payer, seeds=[b"source", source_name.as_bytes(), authority.key().as_ref()], bump, space= 8 + Source::INIT_SPACE)]
    source: Account<'info , Source> ,    
    system_program: Program<'info, System>
}
