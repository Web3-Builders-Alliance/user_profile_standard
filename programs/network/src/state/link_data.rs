use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct LinkData{
    node: Pubkey,
    child: Pubkey,
    parent: Pubkey,
    #[max_len(10)]
    date_created: String,
    created_slot: u64 ,
}

impl LinkData {

    pub fn initialize_link(&mut self, parent: Pubkey, child: Pubkey, node: Pubkey, init_time:String) -> Result<()> {
        self.node = node;
        self.child = child;
        self.parent = parent;
        self.date_created = init_time ;
        self.created_slot = Clock::get()?.slot;
        Ok(())
    }
}

