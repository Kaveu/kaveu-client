import type { NextComponentType, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { Fragment } from "react"

export const Navigation: NextComponentType = () => {
  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <strong>Kaveu.</strong>
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
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  )
}

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Kaveu | Home</title>
        <meta name="description" content="Run an arbitrage bot thought the power of blockchain." />
      </Head>

      <Navigation />

      <main className="container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ratione optio, sapiente, beatae repellat necessitatibus laborum delectus ab quis id excepturi, a fugit repellendus? Autem
          quos saepe sequi accusamus repudiandae. Nisi quia sapiente cupiditate itaque, quae rem nemo odio nesciunt magnam consectetur pariatur quo eaque illo, commodi eum, quidem tempora id magni?
          Molestiae quidem quisquam cum, minus nihil aliquid voluptates!
        </p>
      </main>

      <Footer />
    </Fragment>
  )
}

export default Home
