use anchor_lang::prelude::*;

#[account]
#[derive(Default, InitSpace)]
pub struct Source {
    authority: Pubkey ,
    points : u8 ,
    #[max_len(50)]
    name : String,
}

impl Source {
    
  pub fn create (&mut self, name: String, authority: Pubkey)-> Result<()> {
    self.points = 0; 
    self.name = name;
    self.authority = authority ;
    Ok(())
  }
  pub fn add_points (&mut self, bonus: u8)-> Result<()> {
    self.points =  self.points.checked_add(bonus).unwrap();
    Ok(())
  }
  pub fn subtract_points (&mut self, penalty: u8)-> Result<()> {
    self.points = self.points.checked_sub(penalty).unwrap(); 
    Ok(())
  }

}

