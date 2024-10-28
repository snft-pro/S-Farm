import TransferCard from "../components/TransferCard";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function SendPage() {
    return (
        <main className={styles.sendpage}>
              <div className={styles.walletmunebg} >
             <Link className={styles.walletleft} href={"/wallet"}>Send</Link>
             <Link className={styles.walletmune} href={"/stake"}>Stake</Link>
           
            </div>
<div className={styles.sendcontainer}>               
                <TransferCard />
               
            </div>
        </main>
    );
}