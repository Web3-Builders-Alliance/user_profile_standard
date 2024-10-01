import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles/sourceOptionsCard.module.css';
import SourceData from './SourceData';
import useSourceDataAccounts from './hooks/useSourceDataAccounts';

const SourceOptionsCard = (props) => {
  const [search, setSearch ] = useState(false);
  const [create, setCreate ] = useState(false);
  const [loadSource, setLoadSource] = useState(false);
  const [userId, setUserId] = useState("");
  useSourceDataAccounts();

const Source = () => {
  return(
    <SourceData authority={userId}/>
  ) 
}

const Search = (props) => {
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
          <Typography variant="h6" sx={{color: "#DECEC9"}} >Create</Typography>
          <Typography  variant="h5"  sx={{color: "#8596B1"}} >Source Account</Typography> 
        </Box>        
        <Form  handleCreate={props.handleCreate} handleSignIn={props.handleSignIn} />
      </Box>
    </Card>
  ) 
}

const First = (props) => {
  return( 
    <Card variant="outlined" className={styles.wrapper}>
        <Box className={styles.content}>
          <Box className={styles.text}>
             <Typography sx={{color: "#DECEC9"}} variant="h5">Sources</Typography>
            <Typography sx={{color: "#8596B1"}} variant="body1">
                Are Community Provided.
            </Typography>
            <Typography sx={{color: "#8596B1"}} variant="body1">Create Soucers to gain More </Typography>
            <Typography sx={{color: "#8596B1"}} variant="body1">Reputation</Typography>
          </Box>        
          <Box
            className={styles.buttons}
          >
            <Button size="large" onClick={ (e) => props.handleSignIn(e)}>Search</Button>
            <Button size="large" onClick={ (e) =>props.handleCreate(e)}>Create</Button>
          </Box>
        </Box>
    </Card>
  ) 
}

const Form = (props) => {
  return( <Box className={styles.repForm}>
    <Box component="form" className={styles.textField}>
      <Typography variant="body2" sx={{color: "#DECEC9"}}>Enter Authority ID</Typography> 
      <TextField value={userId} onChange= {(e) => setUserId(e.target.value)} id="standard-basic" label="authority" variant="standard" />         
    </Box>
    <Box className={styles.createButtons}>
      <Button size='small' onClick={ (e) => props.handleSignIn(e)}>Search</Button>
      <Button size='small' onClick={ (e) =>props.handleCreate(e)}>Create</Button>
    </Box>
  </Box>
  )
}

  const handleSearchSourceButton = (e) =>{ 
    setCreate(false)
    setSearch(true)
  }
  const handleCreateButton = (e) => {
    setSearch(false)
    setCreate(true)
  }

  const searchSource = (e) => {
    e.preventDefault();
    setSearch(false)
    setLoadSource(true) 
  }

  return (
    search? <Search  handleCreate={handleCreateButton} handleSignIn={searchSource} />:
    create? <Create handleCreate={() => props.handleCreate(userId)} handleSignIn={handleSearchSourceButton}/>:
    loadSource? <Source/>:
        <First handleCreate= {handleCreateButton} handleSearchSource={handleSearchSourceButton} />
    )
}

export default SourceOptionsCard
