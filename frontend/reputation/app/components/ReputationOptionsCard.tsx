import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RepData from "./RepData"
import styles from './styles/reputationOptionsCard.module.css'

const SignIn = (props) => {
  return( 
        <Card variant="outlined" className={styles.wrapper}>
          <Box><Typography>Sign In</Typography></Box>        
          <RepData/>
          <Box
            component="form" 
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <TextField id="standard-basic" label="authority" variant="standard" />         
            <Button  onClick={ (e) => props.handleDelete(e)}>Find</Button>
            <Button  onClick={ (e) =>props.handleCreate(e)}>Create</Button>
          </Box>
        </Card>
  ) 
}

const Create  = (props) => {
  return( 
        <Card variant="outlined" className={styles.wrapper}>
          <Box><Typography>Create Reputation Account</Typography></Box>        
          <RepData/>
          <Box
            component="form" 
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <TextField id="standard-basic" label="authority" variant="standard" />         
            <Button  onClick={ (e) => props.handleDelete(e)}>Find</Button>
            <Button  onClick={ (e) =>props.handleCreate(e)}>Create</Button>
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
            <Button size="large" onClick={ (e) => props.handleInit(e)}>Sign In</Button>
            <Button size="large" onClick={ (e) =>props.handleCreate(e)}>Sign Up</Button>
          </Box>
          </Box>
          </Box>
        </Card>
  ) 
}

const ReputationOptionsCard = (props) => {
  const [signIn, setSignIn ] = useState(false);
  const [create, setCreate ] = useState(false);

const handleInitButton = (e) =>{ 
    setCreate(false)
    setSignIn(true)
}
const handleCreateButton = (e) => {
    setSignIn(false)
    setCreate(true)
}

  return( 
    signIn? <SignIn/>:
    create? <Create/>:
    <First handleCreate= {handleCreateButton} handleInit={handleInitButton} />
  )
  
}

export default ReputationOptionsCard
