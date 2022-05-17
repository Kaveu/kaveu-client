import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { formatIpfsUri } from "@stores/utils"
import nfts from "@stores/nfts.json"
import { Web3Context } from "@stores/context"

interface IAttribute {
  trait_type: string
  value: string
}

interface NftJson {
  name: string
  description: string
  image: string
  date: number
  attributes: IAttribute[]
  mimetype: string
  owner: string
}

const ipfsGateway = "https://ipfs.io/"

const StoreSection = () => {
  const web3 = useContext(Web3Context)
  const [nftsJ, setNfts] = useState<NftJson[]>([])

  useEffect(() => {
    const { provider, kUtils } = web3
    if (!provider || !kUtils) return
    const contract = kUtils.connect(provider)
    const fetch = async () => {
      const owners: string[] = await contract.getOwners()
    }
  }, [web3])

  return (
    <section>
      <hgroup>
        <h1>Store</h1>
        <h5>This section provides a marketplace to lend, borrow, sell and buy #KVUs.</h5>
        <blockquote>
          &quot;Maecenas vehicula metus tellus, vitae congue turpis hendrerit non. Nam at dui sit amet ipsum cursus ornare.&quot;
          <footer>
            <cite>- Phasellus eget lacinia</cite>
          </footer>
        </blockquote>
      </hgroup>
      {[0, 3, 6, 9, 12].map((start, i) => (
        <div className="grid" key={i}>
          {nfts.slice(start, start + 3).map((nft, y) => (
            <div key={y}>
              <article>
                <header>{nft.name}</header>
                <Image layout="responsive" priority={i == 0} src={ipfsGateway + formatIpfsUri(nft.image)} width={1920} height={1920} />
              </article>
            </div>
          ))}
        </div>
      ))}
      <div className="grid"></div>
    </section>
  )
}

export default StoreSection
