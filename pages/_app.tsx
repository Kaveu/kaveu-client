import type { AppProps } from "next/app"
import { providers } from "ethers"
import App from "@components/app"

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
