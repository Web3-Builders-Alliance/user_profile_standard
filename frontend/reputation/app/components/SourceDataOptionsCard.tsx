import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import styles from './styles/sourceDataOptionsCard.module.css';
import SourceData  from './SourceData';

const SourceDataOptionsCard = (props) => {
  const [search, setSearch ] = useState(false);
  const [create, setCreate ] = useState(false);
  const [loadSource, setLoadSource] = useState(false);
  const [srcName, setSrcName] = useState("");

  const [userId, setUserId] = useState("");

  const Source = () => {
    return(
      <SourceData sourceName={srcName}/>
    ) 
  }

  const Search = (props) => {
    return( 
      <Card variant="outlined" className={styles.wrapper}>
        <Box className={styles.box}>
          <Box className={styles.createText}>
            <Typography variant="h6" sx={{color: "#DECEC9"}} >Search For A</Typography>
            <Typography  variant="h5" sx={{color: "#8596B1"}}  >Source Account</Typography> 
          </Box>        
          <Box className={styles.repForm}>
            <Box component="form" className={styles.textFields}>
              <Typography variant="body1" sx={{color: "#DECEC9"}}>Source Name</Typography> 
              <FormControl color="secondary" className={styles.formControl} sx={{ m: 1, width: 300 }}>
              <TextField
                value={srcName} 
                onChange= {(e) => { e.preventDefault(); setSrcName(e.target.value)}}
                id="standard-basic" 
                label="source name"
                variant="filled"
                sx= {{backgroundColor:"#8596B1", marginTop: "10px"}}
                color="info"
              />         
              </FormControl>
            </Box>
            <Box className={styles.createButtons}>
              <Button size='small' onClick={ (e) => props.handleSignIn(e)}>Search</Button>
              <Button size='small' onClick={ (e) =>props.handleCreate(e)}>Initialize</Button>
            </Box>
          </Box>
        </Box>
      </Card>
    ) 
  }

  const Create  = (props) => {
    return( 
      <Card variant="outlined" className={styles.wrapper}>
        <Box className={styles.box}>
          <Box className={styles.createText}>
            <Typography variant="h6" sx={{color: "#DECEC9"}} >Initialize</Typography>
            <Typography  variant="h5"sx={{color: "#8596B1"}} >Source Data</Typography> 
          </Box>        
          <Box className={styles.repForm}>
            <Box component="form" className={styles.textFields}>
              <Typography variant="body1" sx={{color: "#DECEC9"}}> Authority ID</Typography> 
              <FormControl color="secondary" className={styles.formControl} sx={{ m: 1, width: 300 }}>
              <TextField
                value={userId}
                onChange= {(e) => { e.preventDefault(); setUserId(e.target.value)}}
                id="standard-basic"
                label="authority"
                variant="filled"
                sx= {{backgroundColor:"#8596B1", marginTop: "10px"}}
                color="info"
              />         
              </FormControl>
              <Typography variant="body1" sx={{color: "#DECEC9"}}>Source Name</Typography> 

              <FormControl color="secondary" className={styles.formControl} sx={{ m: 1, width: 300 }}>
              <TextField
                value={srcName} 
                onChange= {(e) => { e.preventDefault(); setSrcName(e.target.value)}}
                id="standard-basic" 
                label="source name"
                variant="filled"
                sx= {{backgroundColor:"#8596B1", marginTop: "10px"}}
                color="info"
              />         
              </FormControl>
            </Box>
            <Box className={styles.createButtons}>
              <Button size='small' onClick={ (e) => props.handleSignIn(e)}>Search</Button>
              <Button size='small' onClick={ (e) =>props.handleCreate(e)}>Initialize</Button>
            </Box>
          </Box>
        </Box>
      </Card>
    ) 
  }

  const First = (props) => {
    return( 
      <Card variant="outlined" className={styles.wrapper}>
        <Box className={styles.content}>
          <Box className={styles.text}>
            <Typography sx={{color: "#DECEC9"}} variant="h5">Initialize</Typography>
            <Typography sx={{color: "#8596B1"}} variant="body1">
              Your Source Account Here 
            </Typography>
            <Typography sx={{color: "#8596B1"}} variant="body1">To add Your Program to </Typography>
            <Typography sx={{color: "#8596B1"}} variant="body1">Sources</Typography>
          </Box>        
          <Box
            className={styles.buttons}
          >
            <Button size="large" onClick={ (e) => props.handleSearchSource(e)}>Search</Button>
            <Button size="large" onClick={ (e) =>props.handleCreate(e)}>Initialize</Button>
          </Box>
        </Box>
      </Card>
    ) 
  }


  const Form = (props) => {
    return(
      <Box className={styles.repForm}>
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
    search? <Search  handleCreate= {handleCreateButton} handleSignIn={searchSource} />:
      create? <Create handleCreate={() => props.handleInit(userId, srcName)} handleSignIn={handleSearchSourceButton}/>:
        loadSource? <Source/>:
          <First handleCreate= {handleCreateButton} handleSearchSource={handleSearchSourceButton} />
  )
}

export default SourceDataOptionsCard
