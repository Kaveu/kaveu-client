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

interface WalletProvider {
  on: (eventName: string, listener?: CallableFunction) => {}
  off: (eventName: string) => {}
}

const KaveuApp = ({ Component, pageProps }: AppProps) => {
  const [web3, setWeb3] = useState<context.IWeb3Context>({})

  useEffect(() => {
    const providerInit = async () => {
      try {
        if (window.ethereum) {
          const provider = new providers.Web3Provider(window.ethereum, "any")
          const network = await provider.detectNetwork()
          if (network.name == "matic" || network.name == "maticmum") console.log("Matic/Mumbai nework  selected !")
          await provider.send("eth_requestAccounts", [])
          return provider
        }
      } catch (error) {
        throw error
      }
    }

    let provider: WalletProvider
    providerInit()
      .then((web3) => {
        setWeb3({ provider: web3 })
        provider = web3?.provider as WalletProvider
        provider?.on("chainChanged", async (_chainId: any) => window.location.reload())
        provider?.on("accountsChanged", async (_chainId: any) => {
          await web3?.send("eth_requestAccounts", [])
          setWeb3({ provider: web3 })
        })
      })
      .catch((e) => console.error(e))

    return () => {
      provider?.off("chainChanged")
      provider?.off("accountsChanged")
    }
  }, [])

  return (
    <context.Web3Context.Provider value={web3}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </context.Web3Context.Provider>
  )
}

export default KaveuApp
