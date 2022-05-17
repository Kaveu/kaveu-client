import { Fragment } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import StoreSection from "@components/store.section"

const Store: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Kaveu | Store</title>
      </Head>

      <StoreSection />
    </Fragment>
  )
}

export default Store
