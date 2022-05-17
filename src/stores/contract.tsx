import { providers, Contract, constants } from "ethers"
import kaveuErc721 from "./kaveuAbi.json"
import kUtils from "./kaveuUtils.json"

const kaveuContract = (network?: providers.Network) => {
  if (network?.name == "maticmum") {
    return new Contract("0xf46f27ca5D858103e7ad5D7dFd4556786010d2f8", kaveuErc721)
  }
  return new Contract(constants.AddressZero, kaveuErc721)
}

const kaveuUtils = (network?: providers.Network) => {
  if (network?.name == "maticmum") {
    return new Contract("0x9F20Dc0448E1c454936cE65BC12234c0F66CACFF", kUtils)
  }
  return new Contract(constants.AddressZero, kUtils)
}

export { kaveuContract, kaveuUtils }
