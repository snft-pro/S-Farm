import { MediaRenderer, Web3Button, toEther, useAddress, useContract, useContractRead, useNFT } from "@thirdweb-dev/react";
import styles from "@/../styles/Home.module.css";
import { ANIMALS_CONTRACT_ADDRESS, ASTAKING_CONTRACT_ADDRESS } from "../../constants/contracts";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

// Props for the BusinessCard component
// TokenId of NFT to display
type Props = {
    tokenId: number;
};

export default function BusinessCard({ tokenId }: Props) {
    // Get the user's address
    const address = useAddress();

    // State for the claimable rewards
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    
    // Get the businesses contract instance
    // Get the NFT data for the tokenId
    const { contract: businessesContract } = useContract(ANIMALS_CONTRACT_ADDRESS);
    const { data: nft } = useNFT(businessesContract, tokenId);

    // Get the staking contract instance
    // Get the stake info for the user and tokenId
    const { contract: stakingContact } = useContract(ASTAKING_CONTRACT_ADDRESS);
    const { data: businessRewards } = useContractRead(
        stakingContact,
        "getStakeInfoForToken",
        [
            tokenId,
            address
        ]
    );

    // Update the claimable rewards every second
    useEffect(() => {
        if (!stakingContact || !address) return;

        async function loadClaimableRewards() {
            const stakeInfo = await stakingContact?.call("getStakeInfoForToken", [
                tokenId,
                address,
            ]);
            setClaimableRewards(stakeInfo[1]);
        }

        loadClaimableRewards();

        const intervalId = setInterval(loadClaimableRewards, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Truncate the revenue to 6 decimal places
    const truncateRevenue = (revenue: BigNumber) => {
        const convertToEther = toEther(revenue);
        const truncateValue = convertToEther.toString().slice(0, 8); 
        return truncateValue;
    };

    return (
        <div >

            <div className={styles.container6}>
            <MediaRenderer  
                src={nft?.metadata.image}
                style={{ width: "100px", height: "100px",borderRadius: "15px", paddingTop: "5px" }}
                

            />
            

             <h3 className={styles.tipdescription3}>{nft?.metadata.name}</h3>
             {businessRewards && (
                    businessRewards[1].gt(0) && (
                        <p className={styles.tipdescription4}>Level: {businessRewards[0].toNumber()}</p>
                        
                    )
                )}
          
       
                {claimableRewards && (
                    <p className={styles.tipdescription3}> Profit: {truncateRevenue(claimableRewards as BigNumber)}</p>
                   
                )}
                <div>
                 <Web3Button  
                contractAddress={ASTAKING_CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "claimRewards",
                    [tokenId]
                )}
                style={{ 
                    color: "#00ff11", 
                    backgroundImage: "linear-gradient(90deg, rgb(3, 37, 27) 0%, rgba(10, 16, 29, 0.932) 100%)",
                    border: "1px solid #ffffff00",
                    
                    borderRadius: " 5px 5px 10px 10px",
                    fontWeight: "500",
                    fontSize: "10px",
                    fontStyle: "italic",
                    fontFamily: "var(--font-mono)",
                    }}
                onSuccess={() => alert("Collected!")}
                
            >Collect</Web3Button></div>
             </div>
           
        </div>
    );
}