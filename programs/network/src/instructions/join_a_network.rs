use anchor_lang::prelude::*;
use crate::state::{network::Network, node::Node, join_escrow::JoinEscrow};
pub fn join_a_network(ctx: Context<Join>, init_time: String) -> Result<()> {
    ctx.accounts.join_escrow.initialize_escrow(ctx.accounts.authority.key(),ctx.accounts.parent.key(),init_time)?;
    Ok(())
}

#[derive(Accounts)]
pub struct Join<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    parent: SystemAccount<'info>,
    #[account(seeds=[b"network", authority.key.as_ref()], bump ,)]
    network: Account<'info, Network>, 
    #[account(seeds=[b"node", parent.key.as_ref()], bump ,)]
    node: Account<'info, Node>, 
    #[account(seeds=[b"network", parent.key.as_ref()], bump ,)]
    parent_network: Account<'info, Network>,
    #[account(init, payer=payer, seeds=[b"join_escrow", authority.key.as_ref()], bump , space = JoinEscrow::INIT_SPACE)]
    join_escrow: Account<'info, JoinEscrow>,
    system_program: Program<'info, System>
}

