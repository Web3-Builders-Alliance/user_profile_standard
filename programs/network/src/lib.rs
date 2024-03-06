use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("8VsDQfLQ8GALJkDGFekW5Cx7RcSuA3vDKyU25VPFJMD4");

#[program]
pub mod network {
    use super::*;

    // pub fn register_as_source(ctx: Context<RegisterAsSource>, source_name: String) -> Result<()> {
    //    instructions::register_network_as_reputation_source::register_network_as_reputation_source(ctx, source_name) 
    // }
    pub fn add_to_network (ctx: Context<Add>,) -> Result<()> {
        instructions::add_to_network::add_to_network(ctx,)
    }
    pub fn start_network_node(ctx: Context<StartNode>,init_time: String ) -> Result<()> {
        instructions::start_network_node::start_node(ctx, init_time)
    }
    // pub fn join_as_parent() -> Result<()> {} 
    pub fn join_a_network(ctx: Context<Join>) -> Result<()> {
        instructions::join_a_network::join_a_network(ctx)  
    } 
    
    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        instructions::create_network_account::create_account(ctx)
    }
}

