import { ReactNode, useEffect, useState } from "react"
import { providers } from "ethers"
import { initialeWeb3State, ThemeContext, Web3Context } from "@stores/context"
import { kaveuContract, kaveuUtils } from "@stores/contract"
import Layout from "./layout"

// https://docs.metamask.io/guide/ethereum-provider.html#events
type WalletProviderEvent = "chainChanged" | "accountsChanged" | "disconnect" | "connect" | "message"

interface WalletProvider {
  on: (eventName: WalletProviderEvent, listener?: CallableFunction) => void
  removeListener: (eventName: WalletProviderEvent, listener?: CallableFunction) => void
  isConnected: () => boolean
}

interface Props {
  children: ReactNode
}

const App = ({ children }: Props) => {
  const [web3, setWeb3] = useState(initialeWeb3State)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    let cleanup = () => {}
    const effect = async () => {
      if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum, "any")

        const chainChanged = async () => {
          const kaveu = kaveuContract(await provider.getNetwork())
          const kUtils = kaveuUtils(await provider.getNetwork())
          setWeb3((w) => ({ ...w, kaveu, kUtils, value: w.value + 1 }))
        }

        const accountsChanged = async () => {
          await provider.send("eth_requestAccounts", [])
          setWeb3((w) => ({ ...w, provider, value: w.value + 1 }))
        }

        const message = (payload: any) => console.log(payload)

        const gProvider = provider.provider as WalletProvider
        gProvider.on("chainChanged", chainChanged)
        gProvider.on("accountsChanged", accountsChanged)
        gProvider.on("message", message)

        cleanup = () => {
          gProvider.removeListener("chainChanged", chainChanged)
          gProvider.removeListener("accountsChanged", accountsChanged)
          gProvider.removeListener("message", message)
        }

        await provider.send("eth_requestAccounts", [])
        const kaveu = kaveuContract(await provider.getNetwork())
        const kUtils = kaveuUtils(await provider.getNetwork())
        setWeb3(({ value: val }) => ({ provider, kaveu, kUtils, value: val++ }))
      }
    }

    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    effect().catch((e) => console.error(e))

    return cleanup
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
