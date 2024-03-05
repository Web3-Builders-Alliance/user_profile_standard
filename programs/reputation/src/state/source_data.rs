use anchor_lang::prelude::*;
#[account]
#[derive(Default, InitSpace)]
pub struct SourceData{
    #[max_len(30)]
    source_name: String ,
    source_authority:Pubkey ,
    source_count: u64,
}
impl SourceData{
    pub fn create (&mut self, source_name: String, source_authority: Pubkey,)-> Result<()> {
        self.source_count = 0; 
        self.source_name = source_name;
        self.source_authority = source_authority ;
        Ok(())
    }
    pub fn add_count(&mut self)->Result<()>{
        self.source_count = self.source_count + 1 ;
        Ok(())
    }
}
