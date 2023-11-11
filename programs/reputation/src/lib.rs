use anchor_lang::prelude::*;

declare_id!("4GTMqydNGdDr7kKKHsZU7gJkq261HpmjTZohd5oPoThK");

#[program]
pub mod reputation {
    use super::*;

    pub fn create_reputation_account(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
