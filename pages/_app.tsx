import type { AppProps } from "next/app"
import { providers } from "ethers"
import App from "@components/app"

import "@styles/pico.custom.css"
import "@styles/navigation.css"

declare global {
  interface Window {
    ethereum: providers.ExternalProvider
    web3: any
  }
}

const KaveuApp = ({ Component, pageProps }: AppProps) => {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  )
}

export default KaveuApp
