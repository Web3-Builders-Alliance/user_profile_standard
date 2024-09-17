import React, {useState, useEffect} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
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
  const program = getRepProgram(w as Wallet);
  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation_data')],
    program.programId
  );

  useEffect(()=>{
    const getData = async () => {
      const d: RepProgData = await program.account.reputationData.fetch(data);
      console.log(`The data here ${d.logs}`)
      setProgData(d)
    }
    getData();

  },[])
  return (
    <Card>
      <Typography variant="h4">RepProgData </Typography>
      <Typography variant="h6">Total Reputation Accounts: {progData? progData.reputationAccountsTally.toString() : 0}</Typography>
      <Typography variant="h6">Total Sources: {progData? progData.sourcesTally.toString() : 0}</Typography>
       <Typography variant="h6">Streaming logs: {progData? progData.logs : ""}</Typography>
    </Card>
  )
}

export default RepProgData  
