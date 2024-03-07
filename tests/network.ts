import * as anchor from '@coral-xyz/anchor' ;
import { Program } from '@coral-xyz/anchor';
import {assert} from 'chai';
import {Reputation} from "../target/types/reputation";
import {Network} from "../target/types/network";
import {createRepAccount} from "./instructions/createRepAccount"
import {createAccount} from "./instructions/network/createAccount"
import {joinANetwork} from "./instructions/network/joinANetwork"
import {startNetworkNode} from "./instructions/network/startNetworkNode"
import {initializeReputationDataAccount} from "./instructions/initializeReputationDataAccount"
import {deleteSourceDataAccount} from "./instructions/deleteSourceDataAccount"
import {initializeSourceDataAccount} from "./instructions/initializeSourceDataAccount"

const provider = anchor.AnchorProvider.env() 
anchor.setProvider(provider) ;
const rep_program = anchor.workspace.Reputation as Program<Reputation> ;
const payer = provider.wallet as anchor.Wallet;
const program = anchor.workspace.Network as Program<Network> ;

const [data] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('reputation_data')],
  rep_program.programId
);
before('\n\n\n*************** CREATE REPUTATION DATA ACCOUNT***************\n\n', async () => {	
  //create payerd
  const {reputationDataTx,} = await initializeReputationDataAccount(payer.payer.publicKey,data);
  console.log("\n\n\n============== CREATE REPUTATION DATA ACCOUNT  =================\n\n")
  console.log(`Created the reputation data account transaction link: ${reputationDataTx}`);
  const repData  = await rep_program.account.reputationData.fetch(data);
  console.log(`\nSources tally is : ${repData.sourcesTally.toString()}`);
  console.log(`\Reputation account tally is : ${repData.reputationAccountsTally.toString()}`);
  console.log(`\nReputation data account authority is : ${repData.initializer.toString()}`);
  assert.equal(repData.sourcesTally.toNumber(), 0 , 'sources tally should be zero') ;
  assert.equal(repData.reputationAccountsTally.toNumber(),0, "reputation accounts tally is zero");

  const sourceName = 'network'
  const authority = new anchor.web3.Keypair()
  const {sourceDataTx,sourceData} = await initializeSourceDataAccount(data,payer.payer.publicKey,authority.publicKey,sourceName) ;
  console.log(`created source data account: ${sourceDataTx}`)
  console.log(`\nThe source data account is:${sourceData}\n`)
  // source. 
  const sd = await rep_program.account.sourceData.fetch(sourceData);
  console.log(`\nSource account name is: ${sd.sourceName}\n`);
  console.log(`\nSource points: ${sd.sourceCount}\n`);
  console.log(`\nSource authority: ${sd.sourceAuthority}\n`);
  assert.equal(sd.sourceName , sourceName , `source name should be ${sourceName}`) ;
  assert.equal(sd.sourceCount.toNumber(), 0 , "source count should be 0");
  assert.equal(sd.sourceAuthority.toString(), authority.publicKey.toString() , `source authority should be ${authority.publicKey.toString()}`);
  const repData2  = await rep_program.account.reputationData.fetch(data);  
  console.log(`\nSources tally in reputation data now ${repData.sourcesTally.toString()}`);
})
after('***************It deletes network as source',async ()=>{
  const sourceName = 'network'
  const authority = new anchor.web3.Keypair()
  const {deleteSourceDataTx} = await deleteSourceDataAccount(data,payer.payer.publicKey,authority.publicKey,sourceName) ;
  console.log(`created source data account: ${deleteSourceDataTx}`)
}) 
describe('**************create network account*****************',()=>{
  it('creates network account', async ()=>{
    const sourceName = 'network'
    const authority = new anchor.web3.Keypair()
    const date = new Date();
    const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const tokenBacked = false;
    const [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('source_data'), Buffer.from(sourceName)],
      rep_program.programId
    );
    const {createRepTx,reputation} = await createRepAccount(data, payer.payer.publicKey,authority.publicKey, dateString, tokenBacked, );
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
    const {createAccountTx,network} = await createAccount(payer.payer.publicKey,authority.publicKey, reputation, sourceData,);
    console.log(`The network account transaction: ${createAccountTx}`)
  })
})
describe('**************creates network node *****************',()=>{
  it('creates network node', async ()=>{
    const sourceName = 'network'
    const authority = new anchor.web3.Keypair()
    const date = new Date();
    const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const tokenBacked = false;
    const [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('source_data'), Buffer.from(sourceName)],
      rep_program.programId
    );
    const {createRepTx,reputation} = await createRepAccount(data, payer.payer.publicKey,authority.publicKey, dateString, tokenBacked, );
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
    const {createAccountTx,network} = await createAccount(payer.payer.publicKey,authority.publicKey, reputation, sourceData,);
    console.log(`The network account transaction: ${createAccountTx}`)
    const {startedNetworkNodeTx, node} =  await startNetworkNode(payer.payer.publicKey, authority.publicKey,network);
    console.log(`Started the network node transaction: ${startedNetworkNodeTx}`)

  })
})

describe('************* join a network *****************',()=>{
  it('joins a network', async ()=>{
    const sourceName = 'network'
    const parent  = new anchor.web3.Keypair()
    let date = new Date();
    let dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    let tokenBacked = false;
    let [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('source_data'), Buffer.from(sourceName)],
      rep_program.programId
    );
    const {createRepTx,reputation} = await createRepAccount(data, payer.payer.publicKey,parent.publicKey, dateString, tokenBacked, );
    console.log(`Created the user reputation account transaction link: ${createRepTx}`);
    const {createAccountTx,network} = await createAccount(payer.payer.publicKey,parent.publicKey, reputation, sourceData,);
    console.log(`The network account transaction: ${createAccountTx}`)
    const {startedNetworkNodeTx, node} =  await startNetworkNode(payer.payer.publicKey, parent.publicKey,network);
    console.log(`Started the network node transaction: ${startedNetworkNodeTx}`)

    const child  = new anchor.web3.Keypair()
    date = new Date();
    dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    tokenBacked = false;
    [sourceData] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('source_data'), Buffer.from(sourceName)],
      rep_program.programId
    );
    const childRep = await createRepAccount(data, payer.payer.publicKey,child.publicKey, dateString, tokenBacked, );
    console.log(`Created the user reputation account transaction link: ${childRep.createRepTx}`);
    const childNet = await createAccount(payer.payer.publicKey,child.publicKey, childRep.reputation, sourceData,);
    console.log(`The network account transaction: ${childNet.createAccountTx}`)

    let {joinANetworkTx ,joinEscrow} = await joinANetwork(payer.payer.publicKey,child.publicKey,childNet.network,network, parent.publicKey, node, );

    console.log(`The join network instraction has been sent successfully ${joinANetworkTx}`)
  })
})


