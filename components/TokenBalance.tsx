import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

type Props = {
    tokenAddress: string;
};

export default function TokenBalance({ tokenAddress }: Props) {
    const address = useAddress();
    const { contract } = useContract(tokenAddress);
    const  {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
    } = useTokenBalance(contract, address);
    
    return (
        <p className={styles.senddescription}>
            {!isTokenBalanceLoading && (
                <p className={styles.senddescription}>Balance: {tokenBalance?.displayValue}</p>
            )}
        </p>
    )
}
