use anchor_lang::prelude::*;
use crate::state::source_data::* ;

pub fn initialize_source_data_account (ctx: Context<InitializeSourceData>,source_name: String) -> Result<()> {
    Ok(())
} 
#[derive(Accounts)]
#[instruction(source_name: String )]
pub struct InitializeSourceData<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(init,payer=payer, seeds=[b"source_data", source_name.as_bytes()], bump, space= 8 + SourceData::INIT_SPACE)]
    source_data: Account<'info,SourceData>,
    system_program:Program<'info, System>
}

