import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RepData from "./RepData"
import styles from './styles/reputationOptionsCard.module.css'


const ReputationOptionsCard = (props) => {
  const [signIn, setSignIn ] = useState(false);
  const [create, setCreate ] = useState(false);
  const [loadRep, setLoadRep] = useState(false);
  const [userId, setUserId] = useState("");


const Reputation = () => {
  return(
    <RepData authority={userId}/>
  ) 
}

const SignIn = (props) => {
  return( 
    <Card variant="outlined" className={styles.wrapper}>
      <Box className={styles.box}>
        <Box className={styles.createText}>
          <Typography variant="h6" sx={{color: "#8596B1"}} >Already Have</Typography>
          <Typography  variant="h5" sx={{color: "#72A2EE"}} >Reputation Account</Typography> 
          <Typography sx={{color: "#8596B1"}} variant="body1" >Sign In</Typography>
        </Box>        
        <Form  handleCreate={props.handleCreate} handleSignIn={props.handleSignIn} />
      </Box>
    </Card>
  ) 
}

const Create  = (props) => {
  return( 
    <Card variant="outlined" className={styles.wrapper}>
      <Box className={styles.box}>
        <Box className={styles.createText}>
          <Typography variant="h6" sx={{color: "#8596B1"}} >Create</Typography>
          <Typography  variant="h5" sx={{color: "#72A2EE"}} >Reputation Account</Typography> 
          <Typography sx={{color: "#8596B1"}} variant="body1" >Join The Community</Typography>
        </Box>        
        <Form  handleCreate={props.handleCreate} handleSignIn={props.handleSignIn} />
      </Box>
    </Card>
  ) 
}

const First = (props) => {
  return( 
    <Card variant="outlined" className={styles.wrapper}>
      <Box className={styles.innerWrapper}>
        <Box className={styles.content}>
          <Box className={styles.text}>
            <Typography sx={{color: "#8596B1"}} variant="h6">Your
              <Typography sx={{color: "#72A2EE"}} variant="h4">Reputation</Typography>
            </Typography>
            <Typography sx={{color: "#8596B1"}} variant="h6">Account is the Central Source for all your</Typography>
            <Typography sx={{color: "#8596B1"}} variant="h6">Reputation Identity Information</Typography>
          </Box>        
          <Box
            className={styles.buttons}
          >
            <Button size="large" onClick={ (e) => props.handleSignIn(e)}>Sign In</Button>
            <Button size="large" onClick={ (e) =>props.handleCreate(e)}>Sign Up</Button>
          </Box>
        </Box>
      </Box>
    </Card>
  ) 
}

const Form = (props) => {
  return( <Box className={styles.repForm}>
    <Box component="form" className={styles.textField}>
      <Typography variant="body1" sx={{color: "#DECEC9"}}>Enter Authority ID</Typography> 
      <TextField value={userId} onChange= {(e) => setUserId(e.target.value)} id="standard-basic" label="authority" variant="standard" />         
    </Box>
    <Box className={styles.createButtons}>
      <Button size='small' onClick={ (e) => props.handleSignIn(e)}>Sign In</Button>
      <Button size='small' onClick={ (e) =>props.handleCreate(e)}>Create</Button>
    </Box>
  </Box>
  )
}

  const handleSignInButton = (e) =>{ 
    setCreate(false)
    setSignIn(true)
  }
  const handleCreateButton = (e) => {
    setSignIn(false)
    setCreate(true)
  }

  const searchRep = (e) => {
    e.preventDefault();
    setSignIn(false)
    setLoadRep(true) 
  }

  return( 
    signIn? <SignIn  handleCreate= {handleCreateButton} handleSignIn={searchRep} />:
    create? <Create handleCreate={() => props.handleCreate(userId)} handleSignIn={handleSignInButton}/>:
    (loadRep)? <Reputation/>:
        <First handleCreate= {handleCreateButton} handleSignIn={handleSignInButton} />
  )

}

export default ReputationOptionsCard
