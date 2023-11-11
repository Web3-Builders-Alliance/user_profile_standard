use anchor_lang::prelude::*;

declare_id!("4GTMqydNGdDr7kKKHsZU7gJkq261HpmjTZohd5oPoThK");

#[program]
pub mod reputation {
    use super::*;
    pub fn create_reputation_account(ctx: Context<Initialize>, password : String) -> Result<()> {
        ctx.accounts.reputation.sources_count = 0 ;
        ctx.accounts.reputation.attached_account = ctx.accounts.payer.key();
        Ok(())
    }
    pub fn create_source_account(ctx: Context<CreateSource>, password : String, source_name: String ) -> Result<()> {
        msg!("SOurce created");
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(password: String, source_name: String )]
pub struct CreateSource<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    #[account(seeds=[b"reputation", password.as_bytes().as_ref()], bump,)]
    reputation: Account<'info , Reputation> ,    
    #[account(init, payer=payer, seeds=[ source_name.as_bytes(), reputation.key().as_ref()], bump, space= 8 + Source::INIT_SPACE)]
    source: Account<'info , Reputation> ,    
    system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(password: String)]
pub struct Initialize<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    #[account(init, payer=payer, seeds=[b"reputation", password.as_bytes().as_ref()], bump, space= 8 + Reputation::INIT_SPACE)]
    reputation: Account<'info , Reputation> ,    
    system_program: Program<'info, System>
}

#[account]
#[derive(Default, InitSpace)]
pub struct Reputation {
    sources_count: u64 ,
    attached_account: Pubkey,
}

#[account]
#[derive(Default, InitSpace)]
pub struct Source {
    points : u64 ,
    #[max_len(50)]
    name : String,
}

