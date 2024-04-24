use anchor_lang::prelude::*;
// use crate::state::{network::Network};
use reputation::cpi::accounts::InitializeSourceData;
use reputation::state::{reputation_data::ReputationData , source_data::SourceData};
use reputation::program::Reputation as ReputationProgram ;
pub fn register_network_as_reputation_source(ctx: Context<RegisterAsSource>, source_name: String ) -> Result<()> {
    let cpi_program = ctx.accounts.reputation_program.to_account_info(); 
    let cpi_accounts = InitializeSourceData {
        payer: ctx.accounts.payer.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
        data: ctx.accounts.reputation_data.to_account_info(),
        source_data: ctx.accounts.source_data.to_account_info(),
        system_program: ctx.accounts.system_program.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    reputation::cpi::initialize_source_data_account(cpi_ctx, source_name) ;
    Ok(())
}

#[derive(Accounts)]
#[instruction(source_name: String)]
pub struct RegisterAsSource<'info>{
    #[account(mut)]
    payer: Signer<'info>,
    authority: SystemAccount<'info>,
    #[account(seeds=[b"source_data", source_name.as_bytes()],bump, seeds::program=reputation_program.key())]
    ///CHECK: CHECKED IN CPI
    source_data : UncheckedAccount<'info,>,
    reputation_data: Account<'info, ReputationData>, 
    reputation_program: Program<'info, ReputationProgram>,
    system_program: Program<'info, System>,
}
