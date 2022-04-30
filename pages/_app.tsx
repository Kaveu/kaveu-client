import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import Layout from "../src/components/layout"
import { Web3Context, IWeb3Context } from "../src/stores/context"
import { providers } from "ethers"

declare global {
  interface Window {
    ethereum: providers.ExternalProvider
    web3: any
  }
}

const KaveuApp = ({ Component, pageProps }: AppProps) => {
  const [wallet, setWallet] = useState<IWeb3Context>({})

  const getWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum, "any")
        const signer = provider.getSigner()
        const network = await provider.detectNetwork()
        if (network.name == "matic" || network.name == "maticmum") {
          console.log("Matic/Mumbai nework  selected !")
        } else {
          console.log("Please provide matic/mumbai network !")
        }
        await provider.send("eth_requestAccounts", [])
        return { provider, signer }
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getWallet()
      .then((wallet) => {
        wallet && setWallet(wallet)
        wallet?.provider.on("network", (_n, o /** new vs old network */) => o && window.location.reload())
      })
      .catch((e) => console.error(e))
    return () => {}
  }, [])

  return (
    <Web3Context.Provider value={wallet}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Context.Provider>
  )
}

export default KaveuApp
