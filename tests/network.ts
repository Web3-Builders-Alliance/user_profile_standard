import * as anchor from '@coral-xyz/anchor' ;
import { Program } from '@coral-xyz/anchor';
import {assert} from 'chai';
import {Reputation} from "../target/types/reputation";
import {Network} from "../target/types/network";
import {createRepAccount} from "./instructions/createRepAccount"
import {createAccount} from "./instructions/network/createAccount"

const provider = anchor.AnchorProvider.env() 
anchor.setProvider(provider) ;
const rep_program = anchor.workspace.Reputation as Program<Reputation> ;
const payer = provider.wallet as anchor.Wallet;
const program = anchor.workspace.Network as Program<Network> ;

const [data] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('reputation_data')],
  rep_program.programId
);

before('',()=>{})

after('',()=>{})

describe('**************create network account*****************',()=>{
  it('creates network account', async ()=>{
    const authority = new anchor.web3.Keypair()
    const date = new Date();
    const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const tokenBacked = false;
    const {createRepTx,reputation} = await createRepAccount(data, payer.payer.publicKey,authority.publicKey, dateString, tokenBacked);
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
    const {createAccountTx,network} = await createAccount(payer.payer.publicKey,authority.publicKey, reputation);
    console.log(`The network account transaction: ${createAccountTx}`)
  })
})
describe('create network account',()=>{
  it('creates network account',()=>{
  })
})


