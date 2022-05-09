import React, { CSSProperties, Fragment, ReactNode, useContext, useEffect, useState } from "react"
import type { NextComponentType } from "next"
import Link from "next/link"
import Image from "next/image"
import { BigNumber } from "ethers"
import { formatAddress, formatBalance } from "@stores/utils"
import { ThemeContext, Web3Context } from "@stores/context"

const Navigation: NextComponentType = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const sun = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
  )

  const moon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
      <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
    </svg>
  )

  const darkModeStyle: CSSProperties = {
    borderRadius: "50%",
    padding: "5px 10px",
  }

  const handleDarkMode = () => setDarkMode((r) => !r)

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
        <li>
          <button style={darkModeStyle} onClick={handleDarkMode}>
            {darkMode ? sun() : moon()}
          </button>
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
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  useEffect(() => setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches), [])

  return (
    <React.Fragment>
      <header className="container-fluid" data-theme={darkMode ? "dark" : "light"}>
        <Navigation />
      </header>
      <main className="container" data-theme={darkMode ? "dark" : "light"}>
        {children}
      </main>
      <footer className="container-fluid" data-theme={darkMode ? "dark" : "light"}>
        <Footer />
      </footer>
    </React.Fragment>
  )
}

export default Layout
