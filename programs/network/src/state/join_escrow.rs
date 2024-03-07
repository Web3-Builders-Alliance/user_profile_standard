use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct JoinEscrow {
    pub parent: Pubkey,
    pub child: Pubkey,
    #[max_len(20)]
    date_created: String,
    created_slot: u64,
}

impl JoinEscrow {

    pub fn initialize_escrow(&mut self, child: Pubkey, parent: Pubkey, init_time:String) -> Result<()> {
        self.child = child;
        self.parent = parent ;
        self.date_created = init_time ;
        self.created_slot = Clock::get()?.slot;
        Ok(())
    }
}

