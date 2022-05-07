import { BigNumber, utils } from "ethers"

export const formatAddress = (address: string) => {
  if (address === "connect") return address
  return address.slice(0, 5) + "..." + address.slice(-3)
}

export const formatBalance = (balance: BigNumber) => {
  if (balance.isZero()) return "0"

  const balanceStr = utils.formatEther(balance)
  const [one, two] = balanceStr.split(".")
  if (two) {
    return one + "." + two.slice(0, 4)
  }
  return balanceStr
}
