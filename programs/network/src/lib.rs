use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("8VsDQfLQ8GALJkDGFekW5Cx7RcSuA3vDKyU25VPFJMD4");

#[program]
pub mod network {
    use super::*;

    pub fn register_as_source(ctx: Context<RegisterAsSource>, source_name: String) -> Result<()> {
       instructions::register_network_as_reputation_source::register_network_as_reputation_source(ctx, source_name) 
    }
    pub fn add_to_network (ctx: Context<AddToNetwork>,init_time: String) -> Result<()> {
        instructions::add_to_network::add_to_network(ctx,init_time)
    }
    pub fn start_network_node(ctx: Context<StartNode>,init_time: String ) -> Result<()> {
        instructions::start_network_node::start_node(ctx, init_time)
    }
    // pub fn join_as_parent() -> Result<()> {} 
    pub fn join_a_network(ctx: Context<Join>,init_time: String) -> Result<()> {
        instructions::join_a_network::join_a_network(ctx, init_time)  
    } 

    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        instructions::create_network_account::create_account(ctx)
    }
    pub fn delete_network_account(ctx: Context<DeleteNetworkAccount>,time:String ) -> Result<()> {
        instructions::delete_network_account::delete_network_account(ctx, time)
    }
    pub fn remove_network_node(ctx: Context<RemoveNode>, time: String) -> Result<()> {
        instructions::remove_network_node::remove_node(ctx, time)
    }
    pub fn exit_from_network(ctx: Context<ExitNetwork>) -> Result<()> {
        instructions::exit_network::exit_network(ctx)
    }
    pub fn remove_from_network(ctx: Context<RemoveFromNetwork>, time: String) -> Result<()> {
        instructions::remove_from_network::remove_from_network(ctx, time)
    }
}

