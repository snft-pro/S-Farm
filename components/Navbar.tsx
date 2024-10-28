import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Navbar.module.css";
import  Conect from "../components/Conect";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
 
    return (
        <div className={styles.navContainer}>
        <nav className={styles.nav}>

        <div className={styles.navLeft}>  
        <Link  href="/" className={`${styles.homeLink} ${styles.footerRight}`} >   
        <Image src="/pic/logo.png" alt={""} width={50} height={50}></Image> 
        </Link>
        </div>

        <div className={styles.navMiddle}> </div> 

        <div className={styles.navRight}> <Conect/></div>
        
        </nav>
        </div>  
      );
    }

export default Navbar;
