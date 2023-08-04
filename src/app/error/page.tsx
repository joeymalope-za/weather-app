import Error from 'next/error'
import styles from '../page.module.css';
import { testConnection } from '../services/weather.service';

export default function Page() {
    return (    
    <main className={styles.main}>
        <div className={styles.content}>
            <h1 className={styles.title}>
                We're experiencing some technical difficulties. Please try again later.
            </h1>
        </div>
    </main>);
}