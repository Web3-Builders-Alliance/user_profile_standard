use anchor_lang::prelude::*;

declare_id!("8VsDQfLQ8GALJkDGFekW5Cx7RcSuA3vDKyU25VPFJMD4");

#[program]
pub mod network {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
