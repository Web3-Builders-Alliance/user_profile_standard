use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("8VsDQfLQ8GALJkDGFekW5Cx7RcSuA3vDKyU25VPFJMD4");

#[program]
pub mod network {
    use super::*;

    pub fn create_account(ctx: Context<CreateAccount>) -> Result<()> {
        instructions::create_network_account::create_account(ctx)
    }
}

