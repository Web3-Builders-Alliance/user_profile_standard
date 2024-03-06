use anchor_lang::prelude::*;
use crate::state::{network::Network, node::Node};
pub fn start_node(ctx: Context<StartNode>, init_time: String) -> Result<()> {
    ctx.accounts.node.initialize_node(ctx.accounts.authority.key() , init_time)?;
    Ok(())
}

#[derive(Accounts)]
pub struct StartNode<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(seeds=[b"network", authority.key.as_ref()], bump ,)]
    network: Account<'info, Network>, 
    #[account(init, payer=payer , seeds=[b"node", authority.key.as_ref(),], bump , space= 8 + Node::INIT_SPACE)]
    node: Account<'info, Node>, 
    system_program: Program<'info,System>
}
