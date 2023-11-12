use anchor_lang::prelude::* ;
#[account]
#[derive(Default, InitSpace)]
pub struct ReputationData {
    reputation_accounts_tally: u64 ,
    sources_tally:u64,
    initializer: Pubkey ,
}
impl ReputationData {
    pub fn create (&mut self,initializer: Pubkey) -> Result<()> {
        self.reputation_accounts_tally = 0;
        self.sources_tally = 0 ;
        self.initializer = initializer ;
        Ok(())
    }
}
