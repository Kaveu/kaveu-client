import type { NextPage } from "next"
import Head from "next/head"
import { Fragment } from "react"
import { Navigation, Footer } from "./index"

const Roadmap: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Kaveu | Roadmap</title>
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

export default Roadmap