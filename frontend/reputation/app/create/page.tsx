'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import createRepAccount from "../instructions/createRepAccount"
import getRepProgram from "../utils/getRepProgram"

const Page =  () => {
  const w = useAnchorWallet() ;
  const program = getRepProgram(w as Wallet);
  const payer = program.provider;
  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation_data')],
    program.programId
  );
  const handleSubmit =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
    console.log("clicked my buttons " + payer.publicKey)
    const date = new Date();
    const datString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const tokenBacked = false;
      const  authority = payer.publicKey;
      const {createRepTx,reputation} = await createRepAccount(data, payer.publicKey,authority, datString, tokenBacked,w as Wallet);
      console.log(`the rep tx ${createRepTx}`);
    }
  };

  return (
    <div>
      <Box><Typography>Create Reputation Source</Typography></Box>
      <Card variant="outlined">
        <Box><Typography>Create Reputation Account</Typography></Box>        
        <Box
          component="form" 
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <TextField id="standard-basic" label="authority" variant="standard" />         
          <Button  onClick={ (e) => handleSubmit(e)}>Create</Button>
        </Box>
      </Card>

    </div>
  )
}

export default Page 
