import { Fragment } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import NftsSection from "@components/nfts.section"

const Nfts: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Kaveu | NFTs</title>
      </Head>

      <NftsSection />
    </Fragment>
  )
}

export default Nfts
