import React, {useState, useEffect, useMemo} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../../utils/getRepProgram"
import {PublicKey} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';

type sourceData = {
   source_name: string ,
    source_authority:PublicKey ,
    source_count: anchor.BN,

} 
const useSourceDataAccounts = () => {
  const [accounts, setAccounts] = useState<sourceData[]>([]);


  const w = useAnchorWallet() ;

  const program = useMemo(() => getRepProgram(w as Wallet),[w]);
  useEffect(()=>{
    const getData = async () => {
      const data: sourceData[] = await program.account.sourceData.all();
      console.log(`The data here ${data}`)
      for(const account in data) {
        const acc = accounts;
        acc.push(account)
        setAccounts(acc)
      }

      console.log(`The accounts here ${accounts}`)
    }
    getData();

  },[program, accounts])
  return (
    <div>SourceData ${accounts.toString()}</div>
  )
}

export default useSourceDataAccounts
