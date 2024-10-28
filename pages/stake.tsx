import type { NextPage } from "next";
import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import StakeToken from "../components/StakeToken";
import RewardToken from "../components/RewardToken";
import Stake from "../components/Stake";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Stakes: NextPage = () => {
  const address = useAddress();

 
  
  return (
    <main className={styles.sendpage}>
      <div className={styles.walletmunebg} >
             <Link className={styles.walletleft} href={"/wallet"}>Send</Link>
             <Link className={styles.walletmune} href={"/stake"}>Stake</Link>
            </div>
      <div className={styles.sendcontainer}>   
        <p className={styles.staketitle}>Stake S Earn SP</p>
        <StakeToken />
       
        <RewardToken />
      
      <Stake />
      </div>
    </main>
  );
};

export default Stakes;