use anchor_lang::prelude::*;
use crate::state::reputation_data::ReputationData;

pub fn initialize_reputation_data_account(ctx:Context<Initialize>, ) -> Result<()> {
    ctx.accounts.data.create(ctx.accounts.payer.key())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    //program dump account 
    #[account(init, payer=payer, seeds=[b"reputation_data"], bump, space= 8 + ReputationData::INIT_SPACE)]
    data: Account<'info,ReputationData>,
    system_program: Program<'info, System>
}

