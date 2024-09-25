import React from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RepData from "./RepData"
import styles from './styles/reputationOptionsCard.module.css'

const ReputationOptionsCard = (props) => {
  return (
        <Card variant="outlined" className={styles.wrapper}>
          <Box><Typography>Reputation Account</Typography></Box>        
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
            <Button  onClick={ (e) =>props.handleCreate(e)}>Create Reputation</Button>
            <Button  onClick={ (e) => props.handleDelete(e)}>Delete Reputation</Button>
          </Box>
        </Card>
  )
}

export default ReputationOptionsCard
