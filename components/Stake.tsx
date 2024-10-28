import {
  Box,
  Card,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  REWARD_TOKEN_ADDRESSES,
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
} from  "../constants/contracts";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";

export default function Stake() {
  const address = useAddress();

  const { contract: stakeTokenContract } = useContract(
    STAKE_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    REWARD_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKE_CONTRACT_ADDRESSES,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const toast = useToast();

  return (
    <div>   
      <Card mt={10}>
            <p className={styles.stakedescription}>Staked Token</p>
            <Skeleton className={styles.stakedescription} isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
              {stakeInfo && stakeInfo[0] ? (
                <p className={styles.stakedescription2}>
                  {ethers.utils.formatEther(stakeInfo[0])}
                 
                </p>
                
              ) : (
                <Text>0</Text>
              )}

            </Skeleton>
            </Card>
         
          <Stack spacing={4}>
              <Input className={styles.stakeInput}
                type="number"
                max={stakeTokenBalance?.displayValue}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
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
                contractAddress={STAKE_CONTRACT_ADDRESSES}
                action={async (contract) => {
                  await stakeTokenContract?.erc20.setAllowance(
                    STAKE_CONTRACT_ADDRESSES,
                    stakeAmount
                  );

                  await contract.call("stake", [
                    ethers.utils.parseEther(stakeAmount),
                  ]);
                  resetValue();
                }}
                onSuccess={() =>
                  toast({
                    title: "Stake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Stake
              </Web3Button>
            </Stack>
            <Stack spacing={4}>
              <Input className={styles.stakeInput}
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
              />
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
                contractAddress={STAKE_CONTRACT_ADDRESSES}
                action={async (contract) => {
                  await contract.call("withdraw", [
                    ethers.utils.parseEther(unstakeAmount),
                  ]);
                }}
                onSuccess={() =>
                  toast({
                    title: "Unstake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Withdraw
              </Web3Button>
            </Stack>
          
        
        <Card mt={5} pt={5}>
         
            <p className={styles.stakedescription}>Claimable</p>
            <Skeleton
              isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}
            >
              {stakeInfo && stakeInfo[0] ? (
                <Box>
                  <p className={styles.stakedescription2}> {ethers.utils.formatEther(stakeInfo[1])} </p>
                 
                </Box>
              ) : (
                <Text>0</Text>
              )}
            </Skeleton>
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
              contractAddress={STAKE_CONTRACT_ADDRESSES}
              action={async (contract) => {
                await contract.call("claimRewards");
                resetValue();
              }}
              onSuccess={() =>
                toast({
                  title: "Rewards Claimed",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              }
            >
              Claim
            </Web3Button>
        
        </Card>
     
    </div>
  );
}
