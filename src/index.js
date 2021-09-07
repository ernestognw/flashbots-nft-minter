const { providers, Wallet, BigNumber } = require("ethers");
const {
  FlashbotsBundleProvider,
} = require("@flashbots/ethers-provider-bundle");
const { ethers, flashbots, nft, gas } = require("./config");

const provider = new providers.InfuraProvider(ethers.chainId);

const GWEI = BigNumber.from(10).pow(9);

const sendBundle = async (flashbotsProvider) => {
  const targetBlockNumber = (await provider.getBlockNumber()) + 1;

  const bundleSubmitResponse = await flashbotsProvider.sendBundle(
    [
      {
        transaction: {
          chainId: ethers.chainId,
          type: 2,
          value: nft.value,
          data: nft.data,
          maxFeePerGas: GWEI.mul(gas.maxFeePerGas),
          maxPriorityFeePerGas: GWEI.mul(gas.maxPriorityFeePerGas),
          to: nft.address,
        },
        signer: new Wallet(nft.minterPrivateKey, provider),
      },
    ],
    targetBlockNumber
  );
  console.log(`Bundle sent for block ${targetBlockNumber}`);
  const response = await bundleSubmitResponse.wait();

  if (response !== 0) {
    console.log(`Bundle not included, retrying...`);
    sendBundle(flashbotsProvider);
  } else {
    console.log("Bundle executed successfully");
  }
};

const main = async () => {
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider,
    new Wallet(flashbots.authSignerPrivateKey),
    flashbots.relayEndpoint
  );

  sendBundle(flashbotsProvider);
};

main();
