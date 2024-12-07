import { Wallet } from 'ethers'

async function generateTestingWallet() {
  const wallet = Wallet.createRandom()
  const privateKey = wallet.privateKey
  console.log({ address: wallet.address, privateKey })
}

generateTestingWallet()
