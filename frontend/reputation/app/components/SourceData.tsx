import React, {useState, useEffect, useMemo} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Box, Card } from '@mui/material';
// import styles from "./styles/s
type sourceData = {
    sourceName: string ,
    sourceAuthority: PublicKey ,
    sourcecount: anchor.BN,
}

const SourceData = (props) => {
  const [srcData, setSrcData] = useState<sourceData>()
  const w = useAnchorWallet() ;
  const program = useMemo(() => getRepProgram(w as Wallet),[w]);

  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('source_data'), Buffer.from(props.sourceName)],
    program.programId
  );

  useEffect(()=>{
    const getData = async () => {
      const sdata = await program.account.sourceData.fetch(data);
      console.log(`The data here ${sdata}`)
    }
    getData();
  },[program, data])

  return (
  <Card variant="outlined" className={styles.wrapper}>
  </Card>
  )
}

export default SourceData
