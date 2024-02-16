use anchor_lang::prelude::*;
use crate::errors::ReputationError;
#[account]
#[derive( InitSpace)]
pub struct Reputation {
    sources_count: u64 ,
    attached_account: Pubkey,
    #[max_len(10)]
    date_creatd: String,
    token_backed: bool,
    scurity_level: Level ,
    #[max_len(10,20)]
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
    pub fn create(&mut self, attached_account: Pubkey ) -> Result<()> {
        self.sources_count = 0 ;
        self.attached_account = attached_account;
        Ok(())
    }
    pub fn add_source(&mut self,) -> Result<()> {
        self.sources_count= match  self.sources_count.checked_add(1){
            Some(v) => v,
            None => return err!(ReputationError::SumLimmit)
        };
        Ok(())
    }
    pub fn remove_source(&mut self) -> Result<()> {
        self.sources_count= match self.sources_count.checked_sub(1) {
            Some(v) => v ,
            None => return err!(ReputationError::SumLimmit)
        };
        Ok(())
    }
    pub fn change_attached_account(&mut self, new_attached_account: Pubkey) -> Result<()> {
        self.attached_account = new_attached_account ;
        Ok(())
    }
    ///ToDO: calculate the security Level
    pub fn calculate_security_level()-> Result<()> {
        Ok(())
    }
}
