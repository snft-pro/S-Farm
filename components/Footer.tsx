import Link from 'next/link';
import styles from "../styles/Footer.module.css";

import React from "react";
export default function Footer() {
  return (


      <footer className={styles.footer}>
        
        <div className={styles.footerMiddle}>

        <Link className={styles.walletleft} href={"/earn-miners"}>Earn</Link>
        <Link className={styles.walletleft} href={"/shop-miners"}>Shop</Link>
        <Link className={styles.walletleft} href={"/wallet"}>Wallet</Link>
        <Link className={styles.walletleft} href={"https://docs.snft.pro/play-to-earn"}>Docs</Link>
  
          </div>

      </footer>
      

  );
}
