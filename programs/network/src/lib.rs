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
    pub fn start_network_node(ctx: Context<StartNode>, ) -> Result<()> {
        instructions::start_network_node::start_node(ctx)
    }
    // pub fn join_as_parent() -> Result<()> {} 
    // pub fn join_as_child() -> Result<()> {} 
    
    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        instructions::create_network_account::create_account(ctx)
    }
}

