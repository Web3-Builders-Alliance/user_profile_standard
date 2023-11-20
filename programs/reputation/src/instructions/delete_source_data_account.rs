use anchor_lang::prelude::*;
use crate::state::{source_data::*, reputation_data::ReputationData};
pub fn delete_source_data_account (ctx: Context<DeleteSourceData>,source_name: String) -> Result<()> {
    // ctx.accounts.source_data.create(source_name, ctx.accounts.authority.key())     
    Ok(())
} 
#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct DeleteSourceData<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut, close=payer, seeds=[b"source_data", source_name.as_bytes()], bump,)]
    source_data: Account<'info,SourceData>,
    #[account(mut,seeds=[b"reputation_data"], bump,)]
    data: Account<'info,ReputationData>,
    system_program:Program<'info, System>
}


