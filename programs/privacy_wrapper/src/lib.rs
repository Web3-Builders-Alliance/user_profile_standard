use anchor_lang::prelude::*;

declare_id!("3bYfZU3BrodZgf1SGNTttXyKUErudj1PwGG5mxyhghCD");

#[program]
pub mod privacy_wrapper {
    use super::*;

    pub fn initialize_user_five(ctx: Context<CreateUserFive>) -> Result<()> {  
        ctx.accounts.from.one = NumberString::St{st: "dddddddddddddddd5".to_string()} ;
        ctx.accounts.from.two = NumberString::Num{num: 5} ;
        ctx.accounts.from.three = NumberString::Num{num: 5} ; 
        ctx.accounts.from.four = NumberString::Num{num: 5} ; 
        ctx.accounts.from.five = NumberString::Num{num: 5} ; 
        Ok(()) 
    }

    pub fn initialize(ctx: Context<CreateFive>, mapping: [Option<u8>;5]) -> Result<()> {
        for value in mapping {
           if let Some(map) = value {                
                match  map {
                    1 => ctx.accounts.five.one = Some(ctx.accounts.from.one.clone()) ,
                    2 => ctx.accounts.five.two = Some(ctx.accounts.from.two.clone()) ,
                    3 => ctx.accounts.five.three = Some(ctx.accounts.from.three.clone()) ,
                    4 => ctx.accounts.five.four = Some(ctx.accounts.from.four.clone()) ,
                    5 => ctx.accounts.five.five = Some(ctx.accounts.from.five.clone()) ,
                    _ => return err!(CreateFiveError::OnlyFiveFields)
                }
           };
        } 
        Ok(())        
    }

}

#[derive(Accounts)]
pub struct CreateUserFive  <'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(init, payer=payer, seeds=[b"from", payer.key.as_ref()], bump, space = 8 + FromFiveU8::INIT_SPACE)]
    pub from: Account<'info,FromFiveU8>,
    pub system_program: Program<'info, System> ,
}

#[derive(Accounts)]
pub struct CreateFive  <'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(init, payer=payer, seeds=[b"five", payer.key.as_ref()], bump, space = 8 + FiveU8::INIT_SPACE)]
    pub five: Account<'info,FiveU8> ,
    pub from: Account<'info,FromFiveU8>,
    pub system_program: Program<'info, System> ,
}

#[account]
#[derive(InitSpace)]
pub struct FiveU8 {
    pub one: Option<NumberString>,
    pub two: Option<NumberString>,
    pub three: Option<NumberString>,
    pub four: Option<NumberString>,
    pub five: Option<NumberString>,
}

#[account]
#[derive(InitSpace)]
pub struct FromFiveU8 {
    pub one: NumberString,
    pub two:  NumberString ,
    pub three:  NumberString ,
    pub four:  NumberString ,
    pub five:  NumberString ,
}

#[derive(InitSpace)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum NumberString{
    Num { num: u64} ,    
    St{
      #[max_len(200)]
       st: String  
    }    
}

#[error_code]
pub enum CreateFiveError {
   #[msg("Only Five Fields Allowed")]
   OnlyFiveFields,
}


