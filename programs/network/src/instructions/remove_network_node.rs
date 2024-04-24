use anchor_lang::prelude::*;
use crate::state::{network::Network, node::Node};
pub fn remove_node(ctx: Context<RemoveNode>, time: String) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct RemoveNode<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(seeds=[b"network", authority.key.as_ref()], bump ,)]
    network: Account<'info, Network>, 
    #[account(mut, close=authority , seeds=[b"node", authority.key.as_ref(),], bump , )]
    node: Account<'info, Node>, 
    system_program: Program<'info,System>
}

