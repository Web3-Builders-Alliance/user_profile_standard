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

}
