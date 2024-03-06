use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct Node {
    authority: Pubkey,
    #[max_len(10)]
    date_created: String,
    created_slot: u64,
}

impl Node {

    pub fn initialize_node(&mut self, authority: Pubkey, init_time:String) -> Result<()> {
        self.authority = authority;
        self.date_created = init_time ;
        self.created_slot = Clock::get()?.slot;
        Ok(())
    }
}
