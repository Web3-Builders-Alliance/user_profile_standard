import React, {useState, useEffect, useMemo} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Box, Card } from '@mui/material';
import styles from "./styles/sourceData.module.css";
import {Reputation} from '../../public/programs/reputation';
import Typography from '@mui/material/Typography';
type sourceData = {
    sourceName: string ,
    sourceAuthority: PublicKey ,
    sourceCount: anchor.BN,
}

type sData = anchor.IdlAccounts<Reputation>["sourceData"]

const SourceData = (props) => {
  const [srcData, setSrcData] = useState<sourceData|null>()
  const w = useAnchorWallet() ;
  const program = useMemo(() => getRepProgram(w as Wallet),[w]);

  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_data'), Buffer.from(props.sourceName)],
    program.programId
  );

  useEffect(()=>{
    const getData = async () => {
      const sdata: sData = await program.account.sourceData.fetch(data);
      setSrcData(sdata)
    }
    getData();
  },[program, data])

  return (
  <Card variant="outlined" className={styles.wrapper}>
    <Box className={styles.content}>
       <Box className={styles.name}>
            <Typography variant="h4"color="primary" >{srcData?.sourceName.toUpperCase()}</Typography> 
        </Box>
        <Box className={styles.count}>
            <Typography variant="h6">Source Count</Typography>
            <Typography variant="h6">{srcData?.sourceCount.toString()}</Typography>
        </Box>
    </Box>
  </Card>
  )
}

export default SourceData
