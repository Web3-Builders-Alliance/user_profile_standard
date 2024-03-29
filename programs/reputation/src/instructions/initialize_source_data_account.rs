use anchor_lang::prelude::*;
use crate::state::{source_data::*,reputation_data::ReputationData};

pub fn initialize_source_data_account (ctx: Context<InitializeSourceData>,source_name: String) -> Result<()> {
    ctx.accounts.source_data.create(source_name, ctx.accounts.authority.key());
    ctx.accounts.data.add_source()
} 
#[derive(Accounts)]
#[instruction(source_name: String)]
pub struct InitializeSourceData<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    authority: SystemAccount<'info>,
    #[account(init,payer=payer, seeds=[b"source_data", source_name.as_bytes()], bump, space= 8 + SourceData::INIT_SPACE)]
    source_data: Account<'info,SourceData>,
    #[account(mut,seeds=[b"reputation_data"], bump,)]
    data: Account<'info,ReputationData>,
    system_program:Program<'info, System>
} 

