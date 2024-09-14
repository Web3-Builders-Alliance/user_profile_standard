'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import createSourceAccount from "../instructions/createSourceAccount"
import createRepAccount from "../instructions/createRepAccount"
import deleteRepAccount from "../instructions/deleteRepAccount"
import deleteSourceAccount from "../instructions/deleteSourceAccount"
import getRepProgram from "../utils/getRepProgram"

const Page =  () => {
  const w = useAnchorWallet() ;
  const program = getRepProgram(w as Wallet);
  const payer = program.provider;
  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation_data')],
    program.programId
  );
  const handleCreateSource =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const name = "name";
      const  authority = payer.publicKey;
      const {createSourceTx,source} = await createSourceAccount(data, authority,payer.publicKey, name ,w as Wallet);
      console.log(`the rep tx ${createSourceTx}`);
    }
  };
  const handleCreateRep =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const date = new Date();
      const datString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      const tokenBacked = false;
      const  authority = payer.publicKey;
      const {createRepTx,reputation} = await createRepAccount(data, payer.publicKey,authority, datString, tokenBacked,w as Wallet);
      console.log(`the rep tx ${createRepTx}`);
    }
  };

  const handleDeleteRep =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const  authority = payer.publicKey;
      const {deleteRepTx} = await deleteRepAccount( payer.publicKey,authority,data,w as Wallet);
      console.log(`the rep tx ${deleteRepTx}`);
    }
  };

  const handleDeleteSource =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const name = "name";
      const  authority = payer.publicKey;
      const {deleteSourceTx} = await deleteSourceAccount(authority,payer.publicKey,name,w as Wallet);
      console.log(`the rep tx ${deleteSourceTx}`);
    }
  };
  return (
    <div>
      <Card variant="outlined">
        <Box><Typography>Create Reputation Source</Typography></Box>
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
          <Button  onClick={ (e) => handleCreateSource(e)}>Create Source</Button>
          <Button  onClick={ (e) => handleDeleteSource(e)}>Delete Source</Button>
        </Box>
      </Card>

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
          <Button  onClick={ (e) => handleCreateRep(e)}>Create Reputation</Button>
          <Button  onClick={ (e) => handleDeleteRep(e)}>Delete Reputation</Button>
        </Box>
      </Card>
    </div>
  )
}

export default Page 
