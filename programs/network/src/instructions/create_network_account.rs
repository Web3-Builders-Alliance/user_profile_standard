use anchor_lang::prelude::*;
use crate::state::{network::Network};
use reputation::Reputation;
use reputation::program::Reputation as ReputationProgram ;
pub fn create_account(ctx: Context<CreateAccount>, ) -> Result<()> {

    Ok(())
}

#[derive(Accounts)]
pub struct CreateAccount<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    #[account(init, payer=payer, seeds=[b"network"], bump , space = 8 + Network::INIT_SPACE)]
    network: Account<'info, Network>, 
    reputation: Account<'info,Reputation>,
    reputation_program: Program<'info, ReputationProgram>
    system_program: Program<'info, System>,
}
 
