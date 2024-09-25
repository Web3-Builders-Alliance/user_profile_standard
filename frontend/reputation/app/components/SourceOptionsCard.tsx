import React from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles/sourceOptionsCard.module.css';

const SourceOptionsCard = (props) => {
  return (
        <Card variant="outlined" className={styles.wrapper}>
          <Box><Typography>Create Source Account</Typography></Box>
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
            <Button  onClick={ (e) => props.handleCreate(e)}>Create Source</Button>
            <Button  onClick={ (e) => props.handleDelete(e)}>Delete Source</Button>
          </Box>
        </Card>
  )
}

export default SourceOptionsCard
