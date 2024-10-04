import React, {useState, useEffect, useMemo} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import {Reputation} from '../../../public/programs/reputation';

type sourceData = {
   sourceName: string ,
    sourceAuthority: string,
    sourceCount: string,
} 

const useSourceDataAccounts = () => {
  const [accounts, setAccounts] = useState<sourceData[]>([]);


  const w = useAnchorWallet() ;

  const program = useMemo(() => getRepProgram(w as Wallet),[w]);
  useEffect(()=>{
    const getData = async () => {
      const data  = await program.account.sourceData.all();
      // console.log(`The data here ${data}`)
      for(const account of  data) {
        const  sd: sourceData = {sourceName:"", sourceCount: "0" , sourceAuthority: ""}
        sd.sourceCount = account.account.sourceCount.toString();
        sd.sourceName = account.account.sourceName;
        sd.sourceAuthority = account.account.sourceAuthority.toString();
        const accs = accounts;
        accs.push(sd)
        setAccounts(accs)
      }

      // console.log(`The accounts here ${accounts}`)
    }
    getData();

  },[program, accounts])
  return accounts
}

export default useSourceDataAccounts
