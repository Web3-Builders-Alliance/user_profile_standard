use anchor_lang::prelude::* ;
#[account]
#[derive(Default, InitSpace)]
pub struct ReputationData {
    reputation_accounts_tally: u64 ,
    sources_tally:u64,
    pub initializer: Pubkey ,
    pub slot_time_created: u64,
    #[max_len(10,20)]
    pub logs: Vec<String>
}
impl ReputationData {
    pub fn create (&mut self,initializer: Pubkey) -> Result<()> {
        self.reputation_accounts_tally = 0;
        self.sources_tally = 0 ;
        self.initializer = initializer ;
        self.slot_time_created = Clock::get()?.slot;
        self.logs.push("Created New".to_uppercase().to_string());
        Ok(())
    }
    pub fn add_source(&mut self) -> Result<()> {
        self.sources_tally = self.sources_tally.checked_add(1).unwrap();
        self.set_logs("New Source Account Added".to_string())?;
        Ok(())
    }

    pub fn add_rep_account(&mut self) -> Result<()> {
        self.reputation_accounts_tally = self.reputation_accounts_tally.checked_add(1).unwrap(); 
        self.set_logs("New Rep Account Added".to_string())?;
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
