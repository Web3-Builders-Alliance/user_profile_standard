use anchor_lang::prelude::*;
#[account]
#[derive(Default, InitSpace)]
pub struct Reputation {
    sources_count: u64 ,
    attached_account: Pubkey,
}
impl Reputation {
    pub fn create(&mut self, payer: Pubkey ) -> Result<()> {
        self.sources_count = 0 ;
        self.attached_account = payer;
        Ok(())
    }
    pub fn add_source(&mut self,) -> Result<()> {
        self.sources_count= self.sources_count.checked_add(1).unwrap();
        Ok(())
    }
    pub fn remove_source(&mut self) -> Result<()> {
        self.sources_count= self.sources_count.checked_sub(1).unwrap() ;
        Ok(())
    }
}
