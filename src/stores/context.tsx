import { createContext } from "react"
import type { BigNumber, providers } from "ethers"

export interface IWeb3Context {
  provider?: providers.Web3Provider
  address?: string
  balance?: BigNumber
}

let initialeContextState: IWeb3Context = {}

export const Web3Context = createContext(initialeContextState)
