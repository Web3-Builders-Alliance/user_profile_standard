use anchor_lang::prelude::*;
use crate::errors::ReputationError;
#[account]
#[derive(Default, InitSpace)]
pub struct Source {
    authority: Pubkey,
    pub reputation: Pubkey,
    points : u8 ,
    #[max_len(50)]
    name : String,
}
impl Source {
    pub fn create (&mut self, name: String, authority: Pubkey, reputation: Pubkey)-> Result<()> {
        self.points = 0; 
        self.name = name;
        self.authority = authority ;
        self.reputation = reputation;
        Ok(())
    }
    pub fn add_points (&mut self, bonus: u8)-> Result<()> {
        self.points = match self.points.checked_add(bonus){
            Some(v) => v,
            None => return err!(ReputationError::SubtrationLimmit),
        };
        Ok(())
    }
    pub fn subtract_points (&mut self, penalty: u8)-> Result<()> {
        self.points = match self.points.checked_sub(penalty) { 
            Some(v) => v,
            None => return err!(ReputationError::SubtrationLimmit)
        };
        Ok(())
    }
}

