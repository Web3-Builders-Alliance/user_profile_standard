import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styles from './styles/sourceOptionsCard.module.css';
import SourceData from './SourceData';
import useSourceDataAccounts from './hooks/useSourceDataAccounts';

const SourceOptionsCard = (props) => {
  const [search, setSearch ] = useState(false);
  const [create, setCreate ] = useState(false);
  const [loadSource, setLoadSource] = useState(false);
  const [userId, setUserId] = useState("");
  const [source, setSource] = React.useState('');
  // const options =  useSourceDataAccounts();
  const options = [{sourceName:"Network"}, {sourceName:"Health"}, {sourceName:"Norton"}]

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
          <Box className={styles.repForm}>
            <Box component="form" className={styles.textFields}>
              <Typography variant="body1" sx={{color: "#DECEC9"}}> Authority ID</Typography> 
              <FormControl color="secondary" className={styles.formControl} sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Select A Source</InputLabel>
                <Select
                  sx={{backgroundColor: "#8596B1"}}
                  labelId="Select Source from List"
                  className={styles.select}
                  value={source}
                  label="Select A Source"
                  onChange={handleSelectOption}
                  color="secondary"
                >
                  {options.map((option, i) => (
                    <MenuItem
                      sx={{backgroundColor: "#8596B1"}}
                      className={styles.tray}
                      key={option.sourceName + i} value={option.sourceName}>
                      {option.sourceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" className={styles.formControl} sx={{ m: 1, width: 300 }}>
              <TextField
                value={userId}
                onChange= {(e) => { e.preventDefault(); setUserId(e.target.value)}}
                label="authority"
                sx= {{backgroundColor:"#8596B1"}}
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
            <Typography variant="h6" sx={{color: "#DECEC9"}} >Create</Typography>
            <Typography  variant="h5"  sx={{color: "#8596B1"}} >Source Account</Typography> 
          </Box>        
          <Box className={styles.repForm}>
            <Box component="form" className={styles.textFields}>

              <Typography variant="body1" sx={{color: "#DECEC9"}}>Select Source</Typography> 
              <FormControl color="secondary" className={styles.formControl} sx={{ m: 1, width: 300 }}>
                <Select
                  labelId="Select Source from List"
                  sx={{backgroundColor: "#8596B1"}}
                  className={styles.select}
                  value={source}
                  label="Select A Source"
                  onChange={handleSelectOption}
                  color="secondary"
                >
                  {options.map((option, i) => (
                    <MenuItem
                      sx={{backgroundColor: "#8596B1"}}
                      className={styles.tray}
                      key={option.sourceName + i} value={option.sourceName}>
                      {option.sourceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body1" sx={{color: "#DECEC9"}}> Authority ID</Typography> 
              <FormControl variant="filled" className={styles.formControl} sx={{ m: 1, width: 300 }}>
              <TextField
                value={userId}
                onChange= {(e) => { e.preventDefault(); setUserId(e.target.value)}}
                label="authority"
                sx= {{backgroundColor:"#8596B1"}}
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

   const handleSelectOption = (event: SelectChangeEvent) => {
    setSource(event.target.value as string);
  };
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
      create? <Create handleCreate={() => props.handleCreate(userId,source)} handleSignIn={handleSearchSourceButton}/>:
        loadSource? <Source/>:
          <First handleCreate= {handleCreateButton} handleSearchSource={handleSearchSourceButton} />
  )
}

export default SourceOptionsCard
