import React, { createContext, SetStateAction, Dispatch } from "react"
import type { providers } from "ethers"

export interface IWeb3Context {
  provider?: providers.Web3Provider
}

export const Web3Context = createContext<IWeb3Context>({})

export interface IErrorComponent {
  error?: Error
  setError?: Dispatch<SetStateAction<Error | undefined>>
}

export const ErrorContext = createContext<IErrorComponent>({})
