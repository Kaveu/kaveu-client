import { Fragment } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const About: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Kaveu | About</title>
        <meta name="description" content="Run an arbitrage bot thought the power of blockchain." />
      </Head>

      <section>
        <article>
          <p>
            <Image priority width={900} height={455} src="/page-under-construction.webp" layout="responsive" />
          </p>
        </article>
      </section>
    </Fragment>
  )
}

export default About
