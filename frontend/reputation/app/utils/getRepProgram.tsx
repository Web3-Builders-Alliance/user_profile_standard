import {IDL } from '../../public/programs/reputation';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Wallet, AnchorProvider } from '@project-serum/anchor';

export default function getRepProgram (w: Wallet) {

  const connection = new Connection('http://localhost:8899');
  // const connection = new Connection('https://api.devnet.solana.com');

  const provider = new AnchorProvider(connection, w as Wallet, {
    commitment: 'confirmed',
  });
  const programID = new PublicKey(
    '4GTMqydNGdDr7kKKHsZU7gJkq261HpmjTZohd5oPoThK'
  );

 return  new Program(IDL, programID, provider);
}
