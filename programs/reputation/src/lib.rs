use anchor_lang::prelude::*;

declare_id!("4GTMqydNGdDr7kKKHsZU7gJkq261HpmjTZohd5oPoThK");

#[program]
pub mod reputation {
    use super::*;
    pub fn create_reputation_account(ctx: Context<Initialize>, ) -> Result<()> {
        ctx.accounts.reputation.sources_count = 0 ;
        ctx.accounts.reputation.attached_account = ctx.accounts.payer.key();
        Ok(())
    }
    pub fn create_source_account(ctx: Context<CreateSource>, source_name: String ) -> Result<()> {
        ctx.accounts.source.points = 0 ;
        ctx.accounts.source.name = source_name ;
        ctx.accounts.reputation.sources_count = ctx.accounts.reputation.sources_count + 1 ;
        // ctx.accounts.source.bump = ctx.bumps.
        msg!("SOurce created");    
        Ok(())
    }
    pub fn add_reputation (ctx: Context<UpdateSource>,source_name: String, bonus: u64 ) -> Result<()> {
        ctx.accounts.source.points = ctx.accounts.source.points + bonus ;
        Ok(())
    }
    pub fn subtract_reputation(ctx: Context<UpdateSource>,source_name: String, penalty: u64 ) -> Result<()> {
        ctx.accounts.source.points = ctx.accounts.source.points - penalty ;
        Ok(())
    } 
}

#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct UpdateSource<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    #[account(mut, seeds=[b"reputation", payer.key().as_ref()], bump,)]
    reputation: Account<'info , Reputation> ,    
    #[account(mut,seeds=[b"source", source_name.as_bytes(), reputation.key().as_ref()],bump)]
    source: Account<'info , Source> ,    
}

#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct CreateSource<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    #[account(mut, seeds=[b"reputation", payer.key().as_ref()], bump,)]
    reputation: Account<'info , Reputation> ,    
    #[account(init, payer=payer, seeds=[b"source", source_name.as_bytes(), reputation.key().as_ref()], bump, space= 8 + Source::INIT_SPACE)]
    source: Account<'info , Source> ,    
    system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction()]
pub struct Initialize<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    #[account(init, payer=payer, seeds=[b"reputation",payer.key().as_ref()], bump, space= 8 + Reputation::INIT_SPACE)]
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

