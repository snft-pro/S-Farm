import { useContract, useNFTs, useUser } from "@thirdweb-dev/react";
import { ANIMALS_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "./../styles/Home.module.css";
import NFTCard2 from "../components/CARDS/NFTCard2";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Shop() {
    // Get the businesses contract instance
    // Get the NFTs from contract
    const { contract: businessesContract } = useContract(ANIMALS_CONTRACT_ADDRESS);
    const { data: businesses } = useNFTs(businessesContract);

    // Get the user's login state
    const { isLoggedIn, isLoading } = useUser();
    const router = useRouter();

    

    return (
      
        <main className={styles.sendpage}>
            
            <div className={styles.walletmunebg} >
            <Link className={styles.walletleft} href={"/shop-miners"}>Miners</Link>
             <Link className={styles.walletleft2} href={"/shop-animals"}>Animals</Link>
             <Link className={styles.walletleft3} href={"/shop-tools"}>Tools</Link>
             <Link className={styles.walletmune} href={"/shop-tasks"}>Tasks</Link>
            </div>
             <div className={styles.main2} >
                
            {businesses && businesses.length > 0 ? (
                businesses.map((business) => (
                    <NFTCard2
                        key={business.metadata.id}
                        nft={business}
                    />
                ))
            ) : (
                <p className={styles.hr5}>Available Animals </p>
            )}
           
           </div>
            </main>
    )
};


