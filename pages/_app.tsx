import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import Layout from "../src/components/layout"
import * as context from "../src/stores/context"
import { providers } from "ethers"

declare global {
  interface Window {
    ethereum: providers.ExternalProvider
    web3: any
  }
}

const KaveuApp = ({ Component, pageProps }: AppProps) => {
  const [wallet, setWallet] = useState<context.IWeb3Context>({})
  const [error, setError] = useState<Error>()

  const getWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum, "any")
        const signer = provider.getSigner()
        const network = await provider.detectNetwork()
        if (network.name == "matic" || network.name == "maticmum") console.log("Matic/Mumbai nework  selected !")
        else setError(new Error("Please provide matic or mumbai network !"))
        await provider.send("eth_requestAccounts", [])
        return { provider, signer }
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    let provider: providers.Web3Provider | undefined
    getWallet()
      .then((wallet) => {
        if (wallet) {
          setWallet(wallet)
          provider = wallet.provider
        }
      })
      .catch((e) => console.error(e))

    if (provider) {
      provider.on("chainChanged", (_chain) => window.location.reload())
      provider.on("accountsChanged", (_accounts) => window.location.reload())
    }

    return () => {
      if (provider) {
        provider.off("chainChanged", (_chain) => window.location.reload())
        provider.off("accountsChanged", (_accounts) => window.location.reload())
      }
    }
  }, [])

  return (
    <context.Web3Context.Provider value={wallet}>
      <context.ErrorContext.Provider value={{ error, setError }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </context.ErrorContext.Provider>
    </context.Web3Context.Provider>
  )
}

export default KaveuApp
