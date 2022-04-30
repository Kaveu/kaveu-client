import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import type { NextComponentType } from "next"
import Link from "next/link"
import { Web3Context } from "../stores/context"

export const Navigation: NextComponentType = () => {
  return (
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
          <Link href="/store">Store</Link>
        </li>
        <li>
          <Link href="/roadmap">Roadmap</Link>
        </li>
        <li>
          <WalletBtn />
        </li>
      </ul>
    </nav>
  )
}

export const Footer: NextComponentType = () => {
  return (
    <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
      Powered by{" "}
      <span>
        <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  )
}

const WalletBtn = () => {
  const { provider } = useContext(Web3Context)
  const [address, setAddress] = useState("connect")

  const getAddress = async () => {
    try {
      return provider?.getSigner().getAddress()
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getAddress()
      .then((add) => add && setAddress(add))
      .catch((e) => console.error(e))
    return () => {}
  }, [provider])

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
      <header className="container-fluid">
        <Navigation />
      </header>
      <main className="container">{children}</main>
      <footer className="container-fluid">
        <Footer />
      </footer>
    </Fragment>
  )
}

export default Layout
