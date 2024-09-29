import React, {useState, useEffect, useMemo} from 'react'
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
import {
  Typography,
  Card,
  Box
} from '@mui/material';
import {Reputation } from '../../public/programs/reputation';  
import styles from "./styles/repData.module.css"


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
type key =  PublicKey|null ;

const RepData = (props) => {
  const [reputation, setReputation] = useState<data|null>(null)
  const [authority, setAuthority] = useState<key>(null)

  const w = useAnchorWallet() ;
  const program = useMemo(() => getRepProgram(w as Wallet),[w]);

  useEffect(()=>{
    if (program.provider.publicKey) {

      if (
        !props.authority || props.authority === "" ||
          props.authority.toString().length < 32 ||
          props.authority.toString().length > 44

      ){ 
        setAuthority(program.provider.publicKey)
      } else {
        setAuthority(new PublicKey(props.authority))
      } 

      if (authority) {
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
      }  }
  },[program,props.authority, authority])

  return (
    <Card className={styles.wrapper}>
      <Box className={styles.innerWrapper}>
        <Box className={styles.text}>
          <Box className={styles.title}>
            <Typography sx={{color: "#72A2EE"}} variant="h5">
              My Reputation 
            </Typography>
          </Box>
          <Box className={styles.info}>
           <Box className={styles.eachInfo}>
           <Typography color="primary" variant="h6">Sources Count:
            </Typography>
             <Typography color="primary" variant="h6"> {reputation ? reputation.sourcesCount.toString() : 0}</Typography>
            </Box>
            <Box className={styles.eachInfo}>
              <Typography color="primary" variant="h6">
                Security Level:
              </Typography>
                <Typography color="primary" variant="h6">{reputation ? reputation.securityLevel.toString().toString() : "" } </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={styles.logs}>
          <Box ><Typography variant="h6">Reputation Account Logs</Typography></Box>
          <div>
            {reputation? reputation.logs.map((v) =>{
              return (
                <div className={styles.log} key={v}>
                  <Typography  color="#161E1F" variant="body2">{`::: ${v.toLowerCase()}`}</Typography>
                </div>
              )
            }) 
              :""}
          </div>
        </Box>
      </Box>
    </Card>
  )
}

export default RepData
