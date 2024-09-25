import React from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles/sourceDataOptionsCard.module.css';

const SourceDataOptionsCard = (props) => {
  return (
        <Card variant="outlined"  className={styles.cardOne} sx={{ minWidth: 275 }}>
          <Box><Typography>Initialize Source Data</Typography></Box>
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
            <Button  onClick={ (e) => props.handleInit(e)}>Create Source Data</Button>
            <Button  onClick={ (e) => props.handleDelete(e)}>Delete Source Data</Button>
          </Box>
        </Card>
  )
}

export default SourceDataOptionsCard
