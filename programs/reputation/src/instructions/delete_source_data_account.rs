use anchor_lang::prelude::*;
use crate::state::source_data::* ;
pub fn delete_source_data_account (ctx: Context<UpdateSourceData>,source_name: String) -> Result<()> {
    // ctx.accounts.source_data.create(source_name, ctx.accounts.authority.key())     
    Ok(())
} 
#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct UpdateSourceData<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(mut, close=payer, seeds=[b"source_data", source_name.as_bytes()], bump,)]
    source_data: Account<'info,SourceData>,
    system_program:Program<'info, System>
}


