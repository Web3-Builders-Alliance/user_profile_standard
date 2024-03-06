use anchor_lang::prelude::*;
use crate::state::{network::Network};
use reputation::state::{reputation::Reputation, source_data::SourceData};
use reputation::program::Reputation as ReputationProgram ;
pub fn start_node(ctx: Context<StartNode>, ) -> Result<()> {
    ctx.accounts.source_data.add_count()?;
    Ok(())
}

#[derive(Accounts)]
pub struct StartNode<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(init, payer=payer, seeds=[b"network", authority.key.as_ref()], bump , space = 8 + Network::INIT_SPACE)]
    network: Account<'info, Network>, 
    #[account(seeds=[b"reputation",authority.key().as_ref()], bump, seeds::program=reputation_program.key())]
    reputation: Account<'info,Reputation>,
    #[account(seeds=[b"source_data", b"network"],bump, seeds::program=reputation_program.key())]
    source_data : Account<'info,SourceData>,
    reputation_program: Program<'info, ReputationProgram>,
    system_program: Program<'info, System>,
}
