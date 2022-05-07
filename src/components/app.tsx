import { Web3Context } from "@stores/context"
import { kaveuContract } from "@stores/contract"
import { providers } from "ethers"
import React, { ReactNode, useEffect, useState } from "react"
import Layout from "./layout"

type WalletProviderEvent = "chainChanged" | "accountsChanged"

interface WalletProvider {
  on: (eventName: WalletProviderEvent, listener?: CallableFunction) => {}
  off: (eventName: WalletProviderEvent) => {}
}

interface Props {
  children: ReactNode
}

const initialeValue = {
  value: 0,
}

const App = ({ children }: Props) => {
  const [web3, setWeb3] = useState(initialeValue)

  useEffect(() => {
    let gProvider: WalletProvider | undefined
    const effect = async () => {
      if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum, "any")

        gProvider = provider.provider as WalletProvider
        gProvider.on("chainChanged", () => window.location.reload())
        gProvider.on("accountsChanged", async () => {
          await provider.send("eth_requestAccounts", [])
          const kaveu = kaveuContract(await provider.getNetwork())
          setWeb3(({ value: val }) => ({ provider, kaveu, value: val++ }))
        })

        await provider.send("eth_requestAccounts", [])
        const kaveu = kaveuContract(await provider.getNetwork())
        setWeb3(({ value: val }) => ({ provider, kaveu, value: val++ }))
      }
    }

    effect().catch((e) => console.error(e))
  }, [])

  return (
    <Web3Context.Provider value={web3}>
      <Layout>{children}</Layout>
    </Web3Context.Provider>
  )
}

export default App
