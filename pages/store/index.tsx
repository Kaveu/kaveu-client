import { Web3Context } from "@stores/context"
import type { NextPage } from "next"
import Head from "next/head"
import { Fragment, useContext, useState } from "react"

const Store: NextPage = () => {
  const { kaveu } = useContext(Web3Context)
  const [k, h] = useState()

  return (
    <Fragment>
      <Head>
        <title>Kaveu | Store</title>
      </Head>

      <section>
        <article>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi libero sunt cum, provident distinctio aspernatur adipisci ad voluptas deleniti asperiores doloribus aliquid, recusandae non
            id exercitationem, delectus harum similique dolorum? Rem quidem laudantium adipisci laborum quae repudiandae ad id ipsa, nesciunt error eaque? Doloremque libero amet asperiores, a omnis
            aliquam dolorum consectetur perspiciatis, id saepe distinctio reprehenderit laboriosam, magnam odio? Adipisci voluptate deleniti distinctio corporis sint, quo iusto corrupti eligendi vitae
            nisi autem magnam nam dolor sed blanditiis velit itaque doloribus, neque culpa, tempora in ea exercitationem. Deleniti, amet perspiciatis?
          </p>
        </article>
      </section>
    </Fragment>
  )
}

export default Store
