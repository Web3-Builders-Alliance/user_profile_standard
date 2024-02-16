use instructions::* ;
use anchor_lang::prelude::*;
pub mod instructions ;
pub mod state;
pub mod errors;
// pub mod error ;
declare_id!("4GTMqydNGdDr7kKKHsZU7gJkq261HpmjTZohd5oPoThK");
#[program]
pub mod reputation {
    use super::*;
    pub fn initialize_reputation_data_account(ctx:Context<Initialize>, ) -> Result<()> {
        instructions::initialize_reputation_data_account::initialize_reputation_data_account(ctx)
    }
    pub fn initialize_source_data_account(ctx:Context<InitializeSourceData>, source_name:String) -> Result<()> {
        instructions::initialize_source_data_account::initialize_source_data_account(ctx,source_name)
    }
    pub fn delete_reputation_data_account(ctx:Context<DeleteReputationData>,) -> Result<()> {
        instructions::delete_reputation_data_account::delete_reputation_data_account(ctx,)
    }
    pub fn delete_source_data_account(ctx:Context<DeleteSourceData>,source_name:String) -> Result<()> {
        instructions::delete_source_data_account::delete_source_data_account(ctx,source_name)
    }
    pub fn create_source_account(ctx: Context<CreateSource>,source_name:String ) -> Result<()> {
        instructions::create_source_account::create_source_account(ctx, source_name) 
    }
    pub fn delete_source_account(ctx: Context<DeleteSource>,source_name:String) -> Result<()> {
        instructions::delete_source_account::delete_source_account(ctx,source_name)
    }
    pub fn create_reputation_account(ctx: Context<CreateReputation>,)->Result<()> {
        instructions::create_reputation_account::create_reputation_account(ctx)
    }
    pub fn change_reputation_attached_account(ctx:Context<UpdateReputation>,new_authority:Pubkey) -> Result<()>{
        instructions::update_reputation::change_attached_account(ctx,new_authority)
    }
    pub fn delete_reputation_account(ctx:Context<DeleteReputation>) -> Result<()> {
        instructions::delete_reputation_account::delete_reputation_account(ctx)
    } 
    pub fn add_reputation (ctx:Context<UpdateSource>,source_name:String, bonus:u8 ) -> Result<()> {
        instructions::update_source::add_reputation(ctx, source_name, bonus)
    }
    pub fn subtract_reputation(ctx:Context<UpdateSource>,source_name:String,penalty:u8)->Result<()> {
        instructions::update_source::subtract_reputation(ctx,source_name, penalty)
    } 
}

