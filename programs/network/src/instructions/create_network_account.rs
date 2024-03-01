use anchor_lang::prelude::*;
use crate::state::{network::Network};
use reputation::state::reputation::Reputation ;
use reputation::program::Reputation as ReputationProgram ;
pub fn create_account(ctx: Context<CreateAccount>, ) -> Result<()> {

    Ok(())
}

#[derive(Accounts)]
pub struct CreateAccount<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(init, payer=payer, seeds=[b"network", authority.key.as_ref()], bump , space = 8 + Network::INIT_SPACE)]
    network: Account<'info, Network>, 
    #[account(seeds=[b"reputation",authority.key().as_ref()], bump, seeds::program=reputation_program.key())]
    reputation: Account<'info,Reputation>,
    reputation_program: Program<'info, ReputationProgram>,
    system_program: Program<'info, System>,
}
