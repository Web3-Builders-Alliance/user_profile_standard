import React, {useState, useEffect} from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Wallet} from '@project-serum/anchor';
import getRepProgram from "../utils/getRepProgram"

const SourceData = () => {
  const w = useAnchorWallet() ;
  const program = getRepProgram(w as Wallet);
  const [data] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('reputation_data')],
    program.programId
  );

  useEffect(()=>{
    const getData = async () => {
      let data = await program.account.data.fetch(data);
      console.log(`The data here ${data}`)
    }
    getData();

  },[])
  return (
    <div>SourceData</div>
  )
}

export default SourceData
