import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import type { NextComponentType } from "next"
import Link from "next/link"
import { Web3Context } from "../stores/context"

export const Navigation: NextComponentType = () => {
  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a style={{ color: "black" }}>
                <strong>Kaveu.</strong>
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/market">Marketplace</Link>
          </li>
          <li>
            <Link href="/roadmap">Roadmap</Link>
          </li>
          <li>
            <WalletBtn />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export const Footer: NextComponentType = () => {
  return (
    <footer className="container-fluid">
      <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
        Powered by{" "}
        <span>
          <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  )
}

const WalletBtn = () => {
  const { signer, provider } = useContext(Web3Context)
  const [address, setAddress] = useState("connect")

  const getAddress = async () => {
    try {
      return signer?.getAddress()
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getAddress()
      .then((add) => add && setAddress(add))
      .catch((e) => console.error(e))
    return () => {}
  }, [provider, signer])

  const click = () => {
    console.log("click??")
  }

  return (
    <button onClick={click} role="button">
      {address}
    </button>
  )
}

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Navigation />
      <main className="container">{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout
