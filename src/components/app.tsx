import { IWeb3Context, ThemeContext, Web3Context } from "@stores/context"
import { kaveuContract } from "@stores/contract"
import { providers } from "ethers"
import React, { ReactNode, useEffect, useState } from "react"
import Layout from "./layout"

type WalletProviderEvent = "chainChanged" | "accountsChanged" | "disconnect" | "connect"

interface WalletProvider {
  on: (eventName: WalletProviderEvent, listener?: CallableFunction) => {}
  removeListener: (eventName: WalletProviderEvent, listener?: CallableFunction) => {}
  isConnected: () => boolean
}

interface Props {
  children: ReactNode
}

const initialeValue = {
  value: 0,
}

const App = ({ children }: Props) => {
  const [web3, setWeb3] = useState<IWeb3Context>(initialeValue)

  useEffect(() => {
    let cleanup = () => {}
    const effect = async () => {
      if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum, "any")

        const chainChanged = async () => {
          const kaveu = kaveuContract(await provider.getNetwork())
          setWeb3((w) => ({ ...w, kaveu, value: w.value + 1 }))
        }

        const accountsChanged = async () => {
          await provider.send("eth_requestAccounts", [])
          setWeb3((w) => ({ ...w, provider, value: w.value + 1 }))
        }

        const gProvider = provider.provider as WalletProvider
        gProvider.on("chainChanged", chainChanged)
        gProvider.on("accountsChanged", accountsChanged)

        cleanup = () => {
          gProvider.removeListener("chainChanged", chainChanged)
          gProvider.removeListener("accountsChanged", accountsChanged)
        }

        await provider.send("eth_requestAccounts", [])
        const kaveu = kaveuContract(await provider.getNetwork())
        setWeb3(({ value: val }) => ({ provider, kaveu, value: val++ }))
      }
    }

    effect().catch((e) => console.error(e))

    return cleanup
  }, [])

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
  }, [])

  return (
    <Web3Context.Provider value={web3}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Layout>{children}</Layout>
      </ThemeContext.Provider>
    </Web3Context.Provider>
  )
}

export default App
