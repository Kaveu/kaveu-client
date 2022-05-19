import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { formatAddress, formatIpfsUri } from "@stores/utils"
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
  id: number
  attributes: IAttribute[]
  external_url: string
  mimetype: string
  owner?: string
}

const ipfsGateway = "https://ipfs.io/"

const NftSection = () => {
  const web3 = useContext(Web3Context)
  const [nftsJ, setNfts] = useState<NftJson[]>(nfts)

  useEffect(() => {
    const { provider, kUtils } = web3
    if (!provider || !kUtils) return
    const contract = kUtils.connect(provider)
    const fetch = async () => {
      const owners: string[] = await contract.getOwners()
      if (owners) setNfts((nfts) => owners.map((owner, i) => ({ ...nfts[i], owner })))
    }
    fetch()
  }, [web3])

  return (
    <section>
      <hgroup>
        <h1>NFTs</h1>
        <h5>This section provides a place to lend and borrow #KVUs.</h5>
        <blockquote>
          &quot;Maecenas vehicula metus tellus, vitae congue turpis hendrerit non. Nam at dui sit amet ipsum cursus ornare.&quot;
          <footer>
            <cite>- Phasellus eget lacinia</cite>
          </footer>
        </blockquote>
      </hgroup>
      {[0, 3, 6, 9, 12].map((start, i) => (
        <div className="grid" key={i}>
          {nftsJ.slice(start, start + 3).map((nft, y) => (
            <div key={y}>
              <article style={{ borderRadius: "15px" }}>
                <header style={{ padding: 0, borderRadius: "15px 15px 0px 0px" }}>
                  <Image style={{ borderRadius: "15px 15px 0px 0px" }} layout="responsive" priority={i == 0} src={ipfsGateway + formatIpfsUri(nft.image)} width={1920} height={1920} />
                </header>
                <a href={`https://testnets.opensea.io/assets/mumbai/0xf46f27ca5d858103e7ad5d7dfd4556786010d2f8/${nft.id}`} target="_blank" rel="noopener noreferrer">
                  {nft.name}
                </a>
                <footer>
                  <small>
                    {nft.owner ? (
                      <a href="http://" target="_blank" rel="noopener noreferrer">
                        {formatAddress(nft.owner)}
                      </a>
                    ) : (
                      "loading..."
                    )}
                  </small>
                </footer>
              </article>
            </div>
          ))}
        </div>
      ))}
      <div className="grid"></div>
    </section>
  )
}

export default NftSection
