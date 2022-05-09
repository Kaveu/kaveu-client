import { Web3Context } from "@stores/context"
import type { NextPage } from "next"
import Head from "next/head"
import { Fragment, useContext, useState } from "react"

const Store: NextPage = () => {
  const { kaveu } = useContext(Web3Context)

  return (
    <Fragment>
      <Head>
        <title>Kaveu | Store</title>
      </Head>

      <section>
        <hgroup>
          <h1>Store</h1>
          <h5>This section provides a marketplace to lend, borrow, sell and buy #KVUs.</h5>
          <blockquote>
            "Maecenas vehicula metus tellus, vitae congue turpis hendrerit non. Nam at dui sit amet ipsum cursus ornare."
            <footer>
              <cite>- Phasellus eget lacinia</cite>
            </footer>
          </blockquote>
        </hgroup>
        <div className="grid">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </section>
    </Fragment>
  )
}

export default Store
