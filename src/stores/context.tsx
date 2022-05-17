import { createContext } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Contract, providers } from "ethers"

export interface IWeb3Context {
  value: number
  provider?: providers.Web3Provider
  kaveu?: Contract
  kUtils?: Contract
}

export const initialeWeb3State: IWeb3Context = {
  value: 0,
}

export const Web3Context = createContext(initialeWeb3State)

export interface IThemeContext {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}

let initialeThemeState: IThemeContext = {
  darkMode: false,
  setDarkMode: () => {},
}

export const ThemeContext = createContext(initialeThemeState)
