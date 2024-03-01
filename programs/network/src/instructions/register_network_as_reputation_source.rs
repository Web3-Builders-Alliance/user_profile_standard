use anchor_lang::prelude::*;
// use crate::state::{network::Network};
use reputation::state::reputation::Reputation ;
use reputation::program::Reputation as ReputationProgram ;
pub fn register_network_as_reputation_source(ctx: Context<RegisterAsSource>, ) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct RegisterAsSource<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(seeds=[b"reputation",authority.key().as_ref()], bump, seeds::program=reputation_program.key())]
    reputation: Account<'info,Reputation>,
    reputation_program: Program<'info, ReputationProgram>,
    system_program: Program<'info, System>,
}
