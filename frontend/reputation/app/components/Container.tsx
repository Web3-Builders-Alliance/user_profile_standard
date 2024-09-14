'use client';
import React, { FC, ReactNode } from 'react';
import Connection from './Connection';
import Header from './Header';
import Footer from './Footer';
import Theme from './Theme';
import styles from "./styles/container.module.css";
import { Box,Container as MuiContainer} from '@mui/material';

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Connection>			
      <Theme>
        <MuiContainer
          maxWidth='lg'
          sx={{ overflowX: 'hidden',}}
          >
          <Header />
          <Box
            className={styles.box}
            sx={{
              background: 'bg',
            }}
            >
            {children}
          <Footer/>		
          </Box>				
        </MuiContainer>		
      </Theme>
    </Connection>
    );
};

export default Container;
