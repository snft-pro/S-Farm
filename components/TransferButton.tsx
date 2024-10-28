import { Web3Button, useContract } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../constants/contracts";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

type Props = {
    tokenAddress: string;
    receiver: string;
    amount: string;
    message: string;
};

export default function TransferButton({ tokenAddress, receiver, amount, message }: Props) {
    const toast = useToast();

    const {
        contract: tokenContract
    } = useContract(tokenAddress, 'token');

    const {
        contract: transferContract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    return (
        
        <Web3Button
        style={{ 
            color: "#ffffff", 
            backgroundImage: "linear-gradient(90deg, rgba(3, 26, 12, 0.938) 40%, rgba(7, 71, 7, 0.945) 100%)",
            border: "1px solid #0dc23a88",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            fontWeight: "500",
            lineHeight: "5px",
            fontSize: "12px",
            marginBottom: "10px",
            fontStyle: "italic",
            fontFamily: "sans-serif",
            }}
            contractAddress={TRANSFER_CONTRACT_ADDRESS}
            action={async (contract) => {
                await tokenContract?.setAllowance(
                    TRANSFER_CONTRACT_ADDRESS,
                    ethers.utils.parseEther(amount).toString()
                );
                
                await transferContract?.call(
                    "transfer",
                    [
                        tokenAddress,
                        receiver,
                        ethers.utils.parseEther(amount),
                        message
                    ]
                );
            }}
             onSuccess={() => alert("Send Successful!")}
        >SEND</Web3Button>
        
    );
}