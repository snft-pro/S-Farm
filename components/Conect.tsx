import { ConnectWallet } from "@thirdweb-dev/react";``
import { Sepolia } from "@thirdweb-dev/chains";
import styles from "../styles/Navbar.module.css";

const displayBalanceToken = { 
  [Sepolia.chainId]: "0x1559D1326Ef9E9016f84961Ba41A15076604E979", 
  color: "#000000",
};

const supportedTokens = {
  [Sepolia.chainId]: [
    {
      address: "0x1559D1326Ef9E9016f84961Ba41A15076604E979",
      name: "SNFT Points",
      symbol: "S",
      icon: "https://i.imgur.com/l9u2wcp.png",
    },
  ],
};


const Conect = () => {
    
    return (
 
        <div className={styles.style}>

          <ConnectWallet
          hideSwitchToPersonalWallet={true}
          supportedTokens={supportedTokens} 
          displayBalanceToken={displayBalanceToken}
          theme={"dark"}
          btnTitle={"Get Started"}
          modalTitle={"SNFT Farm"}
          modalSize={"compact"}
          modalTitleIconUrl={
            "https://i.imgur.com/vVY6afk.png"
          }
          style={{ 
          color: "#a6a8a7", 
          backgroundImage: "linear-gradient(90deg, rgb(3, 37, 27) 0%, rgba(10, 16, 29, 0.932) 100%)",
          border: "1px solid #a6a8a7",
          borderRadius: "50px",
          padding: "15px",  
          fontWeight: "700",
          fontSize: "14px",
          fontStyle: "italic",
          fontFamily: "var(--font-mono)",
          }}
          
          
        />
   
    </div>
    
      );
    }

export default Conect;
