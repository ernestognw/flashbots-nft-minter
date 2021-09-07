const dotenv = require("dotenv");

dotenv.config();

const ethers = {
  chainId: Number(process.env.ETHERS_CHAIN_ID),
};

const flashbots = {
  relayEndpoint: process.env.FLASHBOTS_RELAY_ENDPOINT,
  authSignerPrivateKey: process.env.FLASHBOTS_AUTH_SIGNER_PRIVATE_KEY,
};

const nft = {
  minterPrivateKey: process.env.NFT_MINTER_PRIVATE_KEY,
  value: process.env.NFT_VALUE_WEI,
  data: process.env.NFT_DATA,
  address: process.env.NFT_ADDRESS,
};

console.log(nft)

module.exports = { ethers, flashbots, nft };
