import { Input } from "@chakra-ui/react";
import { useAddress, useContract, useContractMetadata, useContractRead } from "@thirdweb-dev/react";
import { TOKEN_CONTRACT_ADDRESS, TRANSFER_CONTRACT_ADDRESS } from "../constants/contracts";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/Home.module.css";

export default function TransferCard() {
    const address = useAddress();

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);
    
    const {
        contract: tokenContract
    } = useContract(TOKEN_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(contract, "getVerifiedTokens");

    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        message: ''
    });

    const [selectedToken, setSelectedToken] = useState('');

    const handleChange = (event: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };
    
    
    const {
        data: tokenMetadata,
        isLoading: isTokenMetadataLoading,
    } = useContractMetadata(tokenContract);

   
    return (
      
        <div  >
           
            <div className={styles.sendcard}>  
           
            <p  className={styles.stakedescription2}>{tokenMetadata?.name}</p>

            <TokenBalance  tokenAddress={"0x1559D1326Ef9E9016f84961Ba41A15076604E979"} />

            <p className={styles.senddescription}>Send To</p>
            <Input className={styles.sendInput}
                placeholder="0x..."
                type="text"
                value={formData.receiver}
                onChange={(event) => handleChange(event, "receiver")}
            />
            <p className={styles.senddescription}>Amount</p>
            <Input className={styles.sendInput}
                placeholder="0.0"
                type="number"
                value={formData.amount}
                onChange={(event) => handleChange(event, "amount")}
            />
            <p className={styles.senddescription}>Message "optional"</p>
            <Input className={styles.sendInput}
                placeholder="Add short message here."
                type="text"
                value={formData.message}
                onChange={(event) => handleChange(event, "message")}
            />
             <div >
                {address ? (
                    <TransferButton
                        tokenAddress={"0x1559D1326Ef9E9016f84961Ba41A15076604E979"}
                        receiver={formData.receiver}
                        amount={formData.amount.toString()}
                        message={formData.message}
                    />
                ) : (
                    <p ></p>
                )}
            </div>
            </div>
            
        </div>
        
    );
};