use anchor_lang::prelude::*;
use crate::errors::ReputationError;
#[account]
#[derive( InitSpace)]
pub struct Reputation {
    sources_count: u64 ,
    attached_account: Pubkey,
    #[max_len(10)]
    date_created: String,
    slot_time_created: u64,
    token_backed: bool,
    security_level: Level ,
    #[max_len(40,20)]
    logs: Vec<String>
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
#[derive(InitSpace)]
pub enum Level {
    High,
    Medium,
    Low,
}

impl Reputation {
    pub fn create_non_token_backed(&mut self, attached_account: Pubkey,date_string: String, ) -> Result<()> {
        self.sources_count = 0 ;
        self.attached_account = attached_account;
        self.date_created = date_string ; 
        self.slot_time_created = Clock::get()?.slot;
        self.token_backed = false;
        self.security_level = Level::Low;
        self.set_logs("Non Token Backed Rep Account Created".to_string())
    }
    pub fn create_token_backed(&mut self, attached_account: Pubkey,date_string: String, ) -> Result<()> {
        self.sources_count = 0 ;
        self.attached_account = attached_account;
        self.date_created = date_string ; 
        self.slot_time_created = Clock::get()?.slot;
        self.token_backed = true;
        self.security_level = Level::Medium;
        self.set_logs("Token Backed Rep Account Created".to_string())
    }
    pub fn back_with_tokens(&mut self)-> Result<()> {
        self.token_backed= true ; 
        // self.security_level = Level::Medium;
        self.set_logs("Account Now Token Backed".to_string())
    }
    pub fn remove_backing_tokens(&mut self) -> Result<()> {
        self.set_logs("Account Now Not Token Backed".to_string())
    }
    pub fn add_source(&mut self, source_name: String) -> Result<()> {
        self.sources_count= match  self.sources_count.checked_add(1){
            Some(v) =>{
                msg!("Added sorce B");
                v}
            None => return err!(ReputationError::SumLimmit)
        };
        let log = format!("Source added, {}", source_name);
        msg!("Added sorce B");
        self.set_logs(log)
    }
    pub fn remove_source(&mut self) -> Result<()> {
        self.sources_count= match self.sources_count.checked_sub(1) {
            Some(v) => v ,
            None => return err!(ReputationError::SumLimmit)
        };
        self.set_logs("Source removed".to_string())
    }
    pub fn change_attached_account(&mut self, new_attached_account: Pubkey) -> Result<()> {
        self.attached_account = new_attached_account ;
        Ok(())
    }
    ///ToDO: calculate the security Level
    pub fn calculate_security_level()-> Result<()> {
        Ok(())
    }
    pub fn set_logs(&mut self, log: String) -> Result<()> {
        if self.logs.len() == 20 {
            let _ = self.logs.pop();
        } 
        self.logs.insert(0,log);
        Ok(()) 
    }
}
