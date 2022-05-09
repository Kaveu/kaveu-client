import type { Dispatch, SetStateAction } from "react"
import type { Contract, providers } from "ethers"
import { createContext } from "react"

export interface IWeb3Context {
  value: number
  provider?: providers.Web3Provider
  kaveu?: Contract
}

let initialeWeb3State: IWeb3Context = {
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
