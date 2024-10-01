import React, {useState, useEffect, useMemo} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
import styles from './styles/repProgData.module.css'
import { Box} from '@mui/system';
import {
  Typography,
  Card,
} from '@mui/material';
type RepProgData = {
  reputationAccountsTally: anchor.BN,
  sourcesTally: anchor.BN,
  initializer: PublicKey ,
  slotTimeCreated: anchor.BN,
  logs: Array<string>
} 

const RepProgData = () => {
  const [progData, setProgData] = useState<RepProgData| null>(null); 
  const w = useAnchorWallet() ;
  const program = useMemo(() => getRepProgram(w as Wallet),[w]);
  useEffect(()=>{
    const [data] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('reputation_data')],
      program.programId
    );
    const getData = async () => {
      const d: RepProgData = await program.account.reputationData.fetch(data);
      setProgData(d)
    }
    getData();

  },[program])

  return (
    <Card sx={{bgcolor: "#36231b"}} className={styles.wrapper}>
      <Box className={styles.heading}><Typography sx={{color:"#8596B1"}} variant="h5">Reputation Program Data</Typography></Box>
      <Box className={styles.contents}>
        <div className={styles.info}>
          <Typography color="primary" variant="h6">Total Reputation Accounts: <span className={styles.value}> {progData? progData.reputationAccountsTally.toString() : 0}</span></Typography>
        </div>
        <div className={styles.info}>
          <Typography color="primary" variant="h6">Total Sources: <span className={styles.value}> {progData? progData.sourcesTally.toString() : 0}</span></Typography>
        </div>
      </Box>
      <Box className={styles.logs}>
        <div className={styles.info}>
          <Typography sx={{color:"#161E1F"}} variant="h6">Streaming logs </Typography>
        </div>
        <div>
        {progData? progData.logs.map((v) =>{
          return (
            <div className={styles.log} key={v}>
              <Typography  color="#161E1F" variant="body2">{`::: ${v.toLowerCase()}`}</Typography>
            </div>
          )
          }) 
         :""}
      </div>
      </Box>
    </Card>
  )
}

export default RepProgData  
