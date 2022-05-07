import { createContext } from "react"
import type { Contract, providers } from "ethers"

export interface IWeb3Context {
  value: number
  provider?: providers.Web3Provider
  kaveu?: Contract
}

let initialeContextState: IWeb3Context = {
  value: 0,
}

export const Web3Context = createContext(initialeContextState)
