import { providers, Contract } from "ethers"
import kaveuErc721 from "./kaveuAbi.json"

const kaveuContract = (network?: providers.Network) => {
  if (network?.name == "maticmum") {
    return new Contract("0x18A56Ed2395eEE967529f3D9CA653c13013B27c2", kaveuErc721)
  }
  return new Contract("", kaveuErc721)
}

export { kaveuContract }
