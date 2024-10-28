import type { AppProps } from "next/app";
import { ThirdwebProvider, embeddedWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ACCOUNT_FACTORY_CONTRACT_ADDRESS } from "../constants/contracts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={"sepolia"} // Replace with your chain
      
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: ACCOUNT_FACTORY_CONTRACT_ADDRESS,   // if you plan to cover tx fees, use factory contract
          gasless: true,
        })
      ]}
     
    >
       <Head>
        <title>SNFT</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThirdwebProvider>
  );
}

export default MyApp;