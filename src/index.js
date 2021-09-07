const { providers, Wallet, BigNumber } = require("ethers");
const {
  FlashbotsBundleProvider,
} = require("@flashbots/ethers-provider-bundle");
const { ethers, flashbots, nft } = require("./config");

const provider = new providers.InfuraProvider(ethers.chainId);

const GWEI = BigNumber.from(10).pow(9);

const main = async () => {
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider,
    new Wallet(flashbots.authSignerPrivateKey),
    flashbots.relayEndpoint
  );

  provider.on("block", async (blockNumber) => {
    console.log(blockNumber);

    const bundleSubmitResponse = await flashbotsProvider.sendBundle(
      [
        {
          transaction: {
            chainId: ethers.chainId,
            type: 2,
            value: nft.value,
            data: nft.data,
            maxFeePerGas: GWEI.mul(3),
            maxPriorityFeePerGas: GWEI.mul(2),
            to: nft.address,
          },
          signer: new Wallet(nft.minterPrivateKey, provider),
        },
      ],
      blockNumber + 1
    );

    // By exiting this function (via return) when the type is detected as a "RelayResponseError", TypeScript recognizes bundleSubmitResponse must be a success type object (FlashbotsTransactionResponse) after the if block.
    if ("error" in bundleSubmitResponse) {
      console.warn(bundleSubmitResponse.error.message);
      return;
    }

    console.log(await bundleSubmitResponse.simulate());
  });
};

main();
