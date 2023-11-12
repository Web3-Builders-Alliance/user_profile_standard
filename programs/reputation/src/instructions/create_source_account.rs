use anchor_lang::prelude::*;
use crate::state::{source::Source,reputation::Reputation};

pub fn create_source_account(ctx: Context<CreateSource>, source_name: String ) -> Result<()> {
    ctx.accounts.source.create(source_name)?;
    ctx.accounts.reputation.add_source()?; 
    // ctx.accounts.source.bump = ctx.bumps.
    msg!("SOurce created");    
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
    #[account(init, payer=payer, seeds=[b"source", source_name.as_bytes(), reputation.key().as_ref()], bump, space= 8 + Source::INIT_SPACE)]
    source: Account<'info , Source> ,    
    system_program: Program<'info, System>
}

