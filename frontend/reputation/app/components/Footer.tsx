import React from 'react'
import styles from "./styles/footer.module.css"
import {
  ButtonGroup,
  Box,
  Button,
  Card,
  Stack,
  Typography,
  Grid,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.socials}>
        <Typography fontWeight='500'  className={styles.t} variant='h5'>
          CONTACT US
        </Typography>
        <ButtonGroup
          orientation='vertical'
          variant='text'
          aria-label='text button group'
          className={styles.btg}
          >
          <Button color="secondary" startIcon={<InstagramIcon />}><Typography variant="h6">Instagram</Typography></Button>
          <Button  color="secondary" startIcon={<LinkedInIcon />}>{'  '}<Typography variant="h6">LinkedIn</Typography></Button>
          <Button  color="secondary" startIcon={<FacebookIcon />}><Typography variant="h6">Facebook</Typography></Button>
          <Button  color="secondary" startIcon={<TwitterIcon />}><Typography variant="h6">Twitter</Typography></Button>
        </ButtonGroup>
      </div>
      <div className={styles.links}>
        <Typography fontWeight='500' className={styles.t2} variant='h6'>
          Links
        </Typography>
        <ButtonGroup
          className={styles.btg}
          orientation='vertical'
          variant='text'
          aria-label='text button group'
          >
          <Button  color="secondary" fullWidth><Typography>Actions</Typography></Button>
          <Button  color="secondary" fullWidth><Typography>About</Typography></Button>
          <Button  color="secondary" fullWidth><Typography>Home</Typography></Button>
        </ButtonGroup>
      </div>
    </div>
    );
}

export default Footer
