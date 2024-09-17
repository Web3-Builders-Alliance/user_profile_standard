import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.create}>
        <Typography variant="h1" gutterBottom> 
          Create Your Reputation account On solana here!
        </Typography>
        <Link href="/actions">
        <Button className="create-button" size="large" variant="contained">
          <Typography variant="h3">
            Create Reputation
          </Typography>
          </Button>
        </Link>
      </main>
    </div>
  );
}
