"use client";
import styles from './page.module.css';
import Image from 'next/image';

export default function error({ error, reset}:{error: Error, reset: () => void}) {
  return (    
    <main className={styles.main}>
        <div className={styles.content}>
            <h1 className={styles.title}>
                We're experiencing some technical difficulties. Please try again later.
            </h1>
            <p className={styles.description}>
              Please refrain from doing anything hasty. {error.message}
            </p>
            <Image src="/error.gif" alt="error" width={700} height={500} />
        </div>
    </main>);
}