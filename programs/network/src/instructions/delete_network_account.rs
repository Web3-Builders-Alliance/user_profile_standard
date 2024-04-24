use anchor_lang::prelude::*;
use crate::state::{network::Network};
use reputation::state::{reputation::Reputation, source_data::SourceData};
use reputation::program::Reputation as ReputationProgram ;
pub fn delete_network_account(ctx: Context<DeleteNetworkAccount>,init_time: String) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct DeleteNetworkAccount<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(mut, close=payer, seeds=[b"network", authority.key.as_ref()], bump , )]
    network: Account<'info, Network>, 
    #[account(mut,seeds=[b"reputation",authority.key().as_ref()], bump, seeds::program=reputation_program.key())]
    reputation: Account<'info,Reputation>,
    #[account(mut,seeds=[b"source_data", b"network"],bump, seeds::program=reputation_program.key())]
    source_data : Account<'info,SourceData>,
    reputation_program: Program<'info, ReputationProgram>,
    system_program: Program<'info, System>,
}

