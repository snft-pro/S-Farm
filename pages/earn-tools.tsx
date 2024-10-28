import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import {TSTAKING_CONTRACT_ADDRESS } from "../constants/contracts";
import { BigNumber } from "ethers";
import BusinessCard3 from "../components/CARDS/BusinessCard3";
import Link from "next/link";
export default function EARNTOOLS() {
    // Get the user's address needed for staking info
    const address = useAddress();

    // Get the staking contract instance
    // Get the staked tokens for the user
    const { contract: stakingContact } = useContract(TSTAKING_CONTRACT_ADDRESS);
    const { data: stakedTokens, isLoading: loadingBusinesses } = useContractRead(stakingContact, "getStakeInfo", [
        address,
    ]);
    
    return (
        <main className={styles.sendpage} >

                                    <div className={styles.walletmunebg} >
                                    <Link className={styles.walletleft} href={"/earn-miners"}>Miners</Link>
             <Link className={styles.walletleft2} href={"/earn-animals"}>Animals</Link>
             <Link className={styles.walletleft3} href={"/earn-tools"}>Tools</Link>
             <Link className={styles.walletmune} href={"/earn-tasks"}>Tasks</Link>
            </div>

<div className={styles.main2}>      
{!loadingBusinesses ? (
    <>{stakedTokens &&
                stakedTokens[0].length > 0 ? stakedTokens[0]?.map((stakedToken: BigNumber) => (
                    <BusinessCard3
                        key={stakedToken.toString()}
                        tokenId={stakedToken.toNumber()}/>)) : (
                    <p  className={styles.hr5}>No Active Miners</p>)}</> ) : (
                    <p  className={styles.hr5}>Farm Loading...</p>)}  
                    
                    </div>

         </main>
 )};




