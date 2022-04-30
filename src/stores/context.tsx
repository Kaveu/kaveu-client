import { createContext } from "react"
import type { providers} from "ethers"

export interface IWeb3Context {
  provider?: providers.Web3Provider
  signer?: providers.JsonRpcSigner
}

export const Web3Context = createContext<IWeb3Context>({})
