use anchor_lang::prelude::*;
use crate::state::{reputation::Reputation,reputation_data::ReputationData};
pub fn delete_reputation_data_account(_ctx: Context<DeleteReputationData>, ) -> Result<()> {
    Ok(())
}
#[derive(Accounts)]
pub struct DeleteReputationData<'info> {
    #[account(mut)]
    payer: Signer<'info> ,
    #[account(mut,close=payer,seeds=[b"reputation_data"],constraint=payer.key()==data.initializer, bump,)]
    data: Account<'info,ReputationData>,
}
