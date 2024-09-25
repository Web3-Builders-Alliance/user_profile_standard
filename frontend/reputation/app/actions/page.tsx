'use client';
import React from 'react';
import styles  from './page.module.css';
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
import deleteSourceDataAccount  from '../instructions/deleteSourceDataAccount';
import initializeSourceDataAccount  from '../instructions/initializeSourceDataAccount';
import getRepProgram from "../utils/getRepProgram"
import RepProgData from "../components/RepProgData"
import ReputationOptionsCard from '../components/ReputationOptionsCard';
import SourceDataOptionsCard from '../components/SourceDataOptionsCard';
import SourceOptionsCard from '../components/SourceOptionsCard'; 
import { useRouter } from 'next/navigation'
const Page =  () => {
  const w = useAnchorWallet() ;
  const router = useRouter();

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
      const name = "network";
      const  authority = payer.publicKey;
      const {createSourceTx,source} = await createSourceAccount(authority,payer.publicKey, name ,w as Wallet);
      console.log(`the rep tx ${createSourceTx}`);
      router.refresh()
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
      router.refresh()
    }
  };

  const handleDeleteRep =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const  authority = payer.publicKey;
      const {deleteRepTx} = await deleteRepAccount( payer.publicKey,authority,data,w as Wallet);
      console.log(`the rep tx ${deleteRepTx}`);
      router.refresh()
    }
  };

  const handleDeleteSource =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const name = "network";
      const  authority = payer.publicKey;
      const {deleteSourceTx} = await deleteSourceAccount(authority,payer.publicKey,name,w as Wallet);
      console.log(`the rep tx ${deleteSourceTx}`);
      router.refresh()
    }
  };
  const handleInitSourceData =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const sourceName = "network";
      const  authority = payer.publicKey;
      const {sourceData, sourceDataTx} = await initializeSourceDataAccount(data, payer.publicKey,authority,sourceName,w as Wallet);
      console.log(`the rep tx ${sourceDataTx}`);
      router.refresh()
    }
  };
  const handleDeleteSourceData =  async (event) => {
    event.preventDefault();
    if(payer.publicKey) {
      console.log(`clicked my buttons ${payer.publicKey}`)
      const sourceName = "network";
      const  authority = payer.publicKey;
      const {deleteSourceDataTx} = await deleteSourceDataAccount(data,payer.publicKey,authority,sourceName,w as Wallet);
      console.log(`the rep tx ${deleteSourceDataTx}`);
      router.refresh()
    }
  };
  return (
    <div className={styles.container}>
      <Box className={styles.mainSection}>
        <SourceOptionsCard handleCreate={handleCreateSource} handleDelete={handleDeleteSource} />
        <ReputationOptionsCard handleDelete={handleDeleteRep} handleCreate={handleCreateRep}/>
        <SourceDataOptionsCard handleDelete={handleDeleteSourceData} handleInit={handleInitSourceData}/>
      </Box>
      <Box>
        <RepProgData/>  
      </Box>
    </div>
  )
}

export default Page 
