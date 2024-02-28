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
}
