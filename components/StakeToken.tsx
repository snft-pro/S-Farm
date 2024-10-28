import { Card, Skeleton } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { STAKE_TOKEN_ADDRESSES } from  "../constants/contracts";
import styles from "../styles/Home.module.css";

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(STAKE_TOKEN_ADDRESSES);

    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
    
    return (
        
           
                <Card mt={5} pt={5}>
                <p className={styles.stakedescription}>S Balance</p>
                <Skeleton className={styles.stakedescription} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    
                </Skeleton>
               
                <Skeleton className={styles.stakedescription} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <p className={styles.stakedescription2}>{tokenBalance?.displayValue}</p>
                </Skeleton>
                </Card>
           
        
    )
}