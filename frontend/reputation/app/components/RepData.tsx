import React, {useState, useEffect, useMemo} from 'react'
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
import {
  Typography,
  Card,
} from '@mui/material';
import {Reputation } from '../../public/programs/reputation';  

type data =  {
  sourcesCount: anchor.BN,
  attachedAccount: PublicKey,
  dateCreated: string,
  slotTimeCreated: anchor.BN,
  tokenBacked: boolean,
  securityLevel: string, 
  logs: string[]
}

type repData = anchor.IdlAccounts<Reputation>["reputation"]
type level   = anchor.IdlTypes<Reputation>["Level"]
const RepData = () => {
  const [reputation, setReputation] = useState<data|null>(null)
  const w = useAnchorWallet() ;
  const program = useMemo(() => getRepProgram(w as Wallet),[w]);

  useEffect(()=>{
    if (program.provider.publicKey) {
      const  authority = program.provider.publicKey;
      const [rep] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('reputation'),authority.toBuffer()],
        program.programId
      );

      const getData = async () => {
        const rd: repData = await program.account.reputation.fetch(rep);
        const l: level = rd.securityLevel; 
        let levelStr = "" ;
        for (const lev in l) {
        levelStr = lev;
        }
        const dataToSet: data = {...rd, securityLevel: levelStr}
        setReputation(dataToSet)
    }
     getData();
    }
  },[program])

  return (
    <Card>
      <Typography variant="h5">
        RepData
      </Typography>
      <Typography variant="h5">Sources Count: {reputation ? reputation.sourcesCount.toString() : 0}</Typography>
      <Typography variant="h5">Security Level: {reputation ? reputation.securityLevel.toString().toString() : "" } </Typography>
      <Typography variant="h5">Logs: {reputation ? reputation.logs : ""}</Typography>
    </Card>
  )
}

export default RepData
