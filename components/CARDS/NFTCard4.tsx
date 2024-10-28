import { MediaRenderer, useAddress, useClaimConditions, useContract } from "@thirdweb-dev/react";
import { NFT, toEther } from "@thirdweb-dev/sdk";
import { BUSINESSES_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../../constants/contracts";
import styles from "../../styles/Home.module.css";
import { useState } from "react";

// Props for the NFTCard component
// NFT to display in shop
type Props = {
    nft: NFT;
};

export default function NFTCard({ nft }: Props) {
    // Get the user's address
    // Pass the address to the handle claim function to set approval for the staking contract
    const address = useAddress();

    // Get the businesses contract instance
    // Get the claim conditions for the NFT for cost data
    const { contract: businessesContract } = useContract(BUSINESSES_CONTRACT_ADDRESS, "edition-drop");
    const { data: claimCondition } = useClaimConditions(businessesContract, nft.metadata.id);

    // Get the staking contract instance
    const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);

    // Function to calculate the earnings per hour for each business NFT
    const calculateEarnings = (cost: number) => {
        return cost *100;
    };
  

    // State for the claim state
    const [claimState, setClaimState] = useState<
    "init" | "nftClaim" | "staking">("init");

    // Function to handle the claim of the NFT
    // Claims business NFT and stakes it for the user
    const handleClaim = async () => {
        if(!address){
            return;
        }

        setClaimState("nftClaim");
        try {
            await businessesContract?.erc1155.claim(nft.metadata.id, 1);
            console.log("NFT claimed");

            setClaimState("staking");
            const isAproved = await businessesContract?.isApproved(
                address,
                STAKING_CONTRACT_ADDRESS
            );
            if(!isAproved) {
                await businessesContract?.setApprovalForAll(STAKING_CONTRACT_ADDRESS, true);
            }
            await stakingContract?.call(
                "stake",
                [nft.metadata.id, 1]
            );
        } catch (error) {
            console.error(error);
        } finally {
            setClaimState("init");
        }
    };
    
    return (
        
        <div className={styles.container}>

            <div >
            
           
            <div>

            <MediaRenderer  
                src={nft.metadata.image}
                style={{ width: "110px", height: "70px",borderRadius: "25px", paddingTop: "5px" }}
            />
          
                        <h3 className={styles.tipdescription3}>{nft.metadata.name} </h3>
                        <p className={styles.tipdescription4}>Only 1</p>
                        </div>


         
                {claimCondition && claimCondition.length > 0 && (
                    claimCondition.map((condition, index) => (
                        <>
                        <div  className={styles.container3}

                            key={index}>
                         
                         

                         <p className={styles.tipdescription}>Cost: {toEther(condition.price)}</p>


                        </div>
                        
                        
                       <div className={styles.container}>
  
                           <button
                className={styles.cancelbutton}
                onClick={handleClaim}
                disabled={claimState !== "init"}
            >{
            claimState === "nftClaim" ? "Preparing" : claimState === "staking" ? "Activation": "Buy"
           
           }
             
            
            </button></div></>
                        
                        
                    ))
                )}
    </div>
         </div>
       
    );
}
