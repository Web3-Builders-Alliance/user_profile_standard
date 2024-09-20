import React, {useState, useEffect} from 'react'
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
import {
  Typography,
  Card,
} from '@mui/material';

//  enum Level {
//   High = "High",
//   Medium = "Medium",
//   Low= "Low" ,
// }
type RepData ={ 
  sourcesCount: anchor.BN,
  attachedAccount: PublicKey,
  dateCreated: string,
  slotTimeCreated: anchor.BN,
  tokenBacked: boolean,
  securityLevel:object, 
  logs: string[]
}

const RepData = () => {
  const [reputation, setReputation] = useState<RepData|null>(null)
  const w = useAnchorWallet() ;
  const program = getRepProgram(w as Wallet);

  useEffect(()=>{
    console.log("inside rep data effect ");
    if (program.provider.publicKey) {
      const  authority = program.provider.publicKey;
      const [rep] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('reputation'),authority.toBuffer()],
        program.programId
      );

      const getData = async () => {
        const data:RepData = await program.account.reputation.fetch(rep);
        console.log(`The reputation account ${data}`)
        setReputation(data)
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
