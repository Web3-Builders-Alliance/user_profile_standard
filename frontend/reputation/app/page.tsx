import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {Box} from '@mui/material';
export default function Home() {

  return (
      <main className={styles.wrap}>
        <Box className={styles.create}>
          <Typography  color="secondary" variant="h2" gutterBottom> 
            Create Your
            <Typography variant="h1">
              {"Reputation".toUpperCase()}
            </Typography> 
            account On {" solana ".toUpperCase()} here!
          </Typography>
          <Link href="/actions">
            <Button className="create-button" size="large" variant="contained">
              <Typography variant="h3">
                Create Reputation
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box className={styles.source}>
          <Typography textAlign="right" color="secondary" variant="h2" gutterBottom> 
            Get {" Reputation ".toUpperCase()}
          <Typography variant="h2">From Different</Typography>
            <Typography variant="h1">
              {"Sources".toUpperCase()}
            </Typography> 
          </Typography>
          <div className={styles.sourceLink} >
          <Link className={styles.sourceButton} href="/actions">
            <Button size="large" variant="contained">
              <Typography variant="h3">
                Create Source 
              </Typography>
            </Button>
          </Link>
        </div>
        </Box>
      </main>
  );
}
