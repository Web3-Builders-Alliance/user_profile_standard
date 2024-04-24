use anchor_lang::prelude::*;
use crate::state::{network::Network, node::Node,link_data::LinkData, join_escrow::JoinEscrow};
pub fn remove_from_network(ctx: Context<RemoveFromNetwork>,time: String) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct RemoveFromNetwork<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    node_authority: SystemAccount<'info>,
    #[account(mut)]
    child: SystemAccount<'info>,
    #[account(seeds=[b"network", authority.key.as_ref()], bump ,)]
    network_account: Account<'info, Network>, 
    #[account(seeds=[b"node", node_authority.key.as_ref()], bump ,)]
    node: Account<'info, Node>, 
    #[account(seeds=[b"network", child.key.as_ref()], bump ,)]
    child_network_account: Account<'info, Network>,
    #[account(mut, close=authority, seeds=[b"link_data",node.key().as_ref(),child.key.as_ref(), authority.key.as_ref()], bump,)]
    link_data: Account<'info,LinkData >,
    system_program: Program<'info, System>
}

