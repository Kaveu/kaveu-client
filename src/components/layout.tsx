import React, { CSSProperties, Fragment, ReactNode, useContext, useEffect, useState } from "react"
import type { NextComponentType } from "next"
import Link from "next/link"
import Image from "next/image"
import { BigNumber } from "ethers"
import { formatAddress, formatBalance } from "@stores/utils"
import { Web3Context } from "@stores/context"

const Navigation: NextComponentType = () => {
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
          <Link href="/metrics">Metrics</Link>
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

const Footer: NextComponentType = () => {
  return (
    <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
      Powered by{" "}
      <span>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  )
}

const WalletBtn = () => {
  const web3 = useContext(Web3Context)
  const [{ address, balance }, setUser] = useState({
    address: "connect",
    balance: BigNumber.from(0),
  })
  const [openModal, setModal] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { provider } = web3

      if (provider) {
        const s = provider.getSigner()
        const [address, balance] = await Promise.all([s.getAddress(), s.getBalance()])
        setUser({ address, balance })
      }
    }

    init().catch((e) => console.error(e))
  }, [web3])

  const btnStyle: CSSProperties = {
    padding: "5px 0 5px 5px",
    borderRadius: "50px",
  }

  const addrStyle: CSSProperties = {
    backgroundColor: "var(--primary)",
    color: "var(--primary-inverse)",
    padding: "11px",
    borderRadius: "50px",
  }

  const handleModal = () => setModal(!openModal)

  return (
    <Fragment>
      <button onClick={handleModal} role="button" className="outline" style={btnStyle}>
        <small>
          <span style={{ marginRight: "var(--font-size)" }}>{formatBalance(balance)} MATIC</span>
          <span style={addrStyle}>{formatAddress(address)}</span>
        </small>
      </button>
      <dialog open={openModal}>
        <article style={{ padding: "var(--font-size)" }}>
          <header>
            <a onClick={handleModal} href="#close" aria-label="Close" className="close"></a>
            Modal title
          </header>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus ac
            justo accumsan ullamcorper.
          </p>
        </article>
      </dialog>
    </Fragment>
  )
}

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <header className="container-fluid">
        <Navigation />
      </header>
      <main className="container">{children}</main>
      <footer className="container-fluid">
        <Footer />
      </footer>
    </React.Fragment>
  )
}

export default Layout
