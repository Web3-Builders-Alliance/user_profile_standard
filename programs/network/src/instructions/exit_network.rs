use anchor_lang::prelude::*;
use crate::state::{network::Network, node::Node,link_data::LinkData, join_escrow::JoinEscrow};
pub fn exit_network(ctx: Context<ExitNetwork>,) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
pub struct ExitNetwork<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    node_authority: SystemAccount<'info>,
    #[account(mut)]
    parent: SystemAccount<'info>,
    #[account(seeds=[b"node", node_authority.key.as_ref()], bump ,)]
    node: Account<'info, Node>, 
    #[account(mut, close=parent, seeds=[b"link_data",node.key().as_ref(),authority.key.as_ref(), parent.key.as_ref(), ], bump,)]
    link_data: Account<'info,LinkData >,
    system_program: Program<'info, System>
}

