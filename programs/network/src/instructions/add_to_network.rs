use anchor_lang::prelude::*;
use crate::state::{network::Network, node::Node,link_data::LinkData, join_escrow::JoinEscrow};
pub fn add_to_network(ctx: Context<Add>, ) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct Add<'info>{
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
    #[account(mut, close=child,seeds=[b"join_escrow", child.key.as_ref()], bump , )]
    join_escrow: Account<'info, JoinEscrow>,
    #[account(init, payer=payer, seeds=[b"link_data",node.key().as_ref(),child.key.as_ref(), authority.key.as_ref()], bump, space=LinkData::INIT_SPACE)]
    link_data: Account<'info,LinkData >,
    system_program: Program<'info, System>
}


