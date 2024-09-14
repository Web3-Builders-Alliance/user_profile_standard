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
        <Typography fontWeight='500' className={styles.t} variant='h6'>
          Contact Us
        </Typography>
        <ButtonGroup
          orientation='vertical'
          variant='text'
          aria-label='text button group'
          className={styles.btg}
          >
          <Button startIcon={<InstagramIcon />}>Instagram</Button>
          <Button startIcon={<LinkedInIcon />}>LinkedIn</Button>
          <Button startIcon={<FacebookIcon />}>Facebook</Button>
          <Button startIcon={<TwitterIcon />}>Twitter</Button>
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
          <Button fullWidth>Actions</Button>
          <Button fullWidth>About</Button>
          <Button fullWidth>Home</Button>
        </ButtonGroup>
      </div>
    </div>
    );
}

export default Footer
