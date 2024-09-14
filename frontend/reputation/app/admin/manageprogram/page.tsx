'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import deleteReputationDataAccount from "../../instructions/deleteReputationDataAccount"
import initializeReputationDataAccount from "../../instructions/initializeReputationDataAccount"
import getRepProgram from "../../utils/getRepProgram"

const Page = () => {
  const w = useAnchorWallet() ;
  const program = getRepProgram(w as Wallet);
  const payer = program.provider;
  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation_data')],
    program.programId
  );
  const handleDelete =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const {deleteReputationDataTx} = await deleteReputationDataAccount(payer.publicKey,data,w as Wallet);
      console.log(`the rep tx ${deleteReputationDataTx}`);
    }
  };
  const handleInit =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const {initReputationDataTx} = await initializeReputationDataAccount(payer.publicKey,data,w as Wallet);
      console.log(`the rep tx ${initReputationDataTx}`);
    }
  };

  return (
    <div>
      <Card>
        <Box>
          <Typography>Initialize Reputation Data Account for the whole program</Typography>
        </Box>
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
          <Button  onClick={ (e) => handleInit(e)}>Initialize Data Account</Button>
        </Box>
      </Card>
      <Card variant="outlined">
        <Box><Typography>Delete the Reputation Data Account For the whole program</Typography></Box>        
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
          <Button  onClick={ (e) => handleDelete(e)}>Delete Data Account</Button>
        </Box>
      </Card>
    </div>
  )}

export default Page 
