import { CSSProperties, Fragment, ReactNode, useContext, useEffect, useState } from "react"
import type { NextComponentType } from "next"
import Link from "next/link"
import { Web3Context } from "@stores/context"
import { utils, BigNumber } from "ethers"

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
  const { provider, kaveu } = useContext(Web3Context)
  const [address, setAddress] = useState("connect")
  const [balance, setBalance] = useState(BigNumber.from(0))

  const userInit = async () => {
    try {
      const signer = provider?.getSigner()
      const balance = await signer?.getBalance()
      let address = await signer?.getAddress()
      return { address, balance }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    userInit()
      .then(({ address, balance }) => {
        if (address) address = address.slice(0, 5) + "..." + address.slice(-3)
        address && setAddress(address)
        balance && setBalance(balance)
      })
      .catch((e) => console.error(e))
    return () => {}
  }, [provider])

  const click = () => {
    console.log("contract kaveu", kaveu)
  }

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

  return (
    <button onClick={click} role="button" className="outline" style={btnStyle}>
      <small>
        <span style={{marginRight: "var(--font-size)"}}>{utils.formatEther(balance)} MATIC</span>
        <span style={addrStyle}>{address}</span>
      </small>
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
