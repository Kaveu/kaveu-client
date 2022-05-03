import { createContext } from "react"
import type { Contract, providers } from "ethers"

export interface IWeb3Context {
  provider?: providers.Web3Provider
  kaveu?: Contract
}

let initialeContextState: IWeb3Context = {}

export const Web3Context = createContext(initialeContextState)
