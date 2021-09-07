## Flashbots NFT Minter 🤖⚡️

This is a custom implementation of a custom NFT minter using flashbots relay.

It is configured via `.env` file (on its first version), and it enables you to escape the Dark Forest when trying to collect your so valued NFTs

### How does it work? ⚙️

1. Copy the `.env.example` file into a `.env` file
2. Fill the values according to [reference](#Reference)
3. Just go to your terminal and run `yarn start`

### Reference

|Variable                 |Description                                                                                 |
|-------------------------|--------------------------------------------------------------------------------------------|
|ETHERS_CHAIN_ID                    |ID of the chain where the transaction is going to be executed|
|FLASHBOTS_RELAY_ENDPOINT           |Flashbots relay endpoint. Must be according to the chain id provided. [More info.](https://docs.flashbots.net/flashbots-auction/miners/mev-relay/#)  |
|FLASHBOTS_AUTH_SIGNER_PRIVATE_KEY  |Private key for the auth account used to build your reputation over time. [More info.](https://docs.flashbots.net/flashbots-auction/searchers/quick-start#how-to-send-your-first-flashbots-bundle) |
|MAX_FEE_PER_GAS_GWEI               |Max fee per gas provided for the transaction in gwei|
|MAX_PRIORITY_FEE_PER_GAS_GWEI      |Max priority fee per gas provided for the transaction in gwei|
|NFT_MINTER_PRIVATE_KEY             |Private key used to transact against the NFT Contract Address|
|NFT_VALUE_WEI                      |The amount of wei required to mint the NFT|
|NFT_DATA                           |This is the data field to send within the transaction against the contract. It should be the call to the MINT function with its arguments (ABI Encoded)|
|NFT_ADDRESS                        |NFT Contract Address|


