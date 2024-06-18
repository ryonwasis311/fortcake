import { initializeConnector } from "@web3-react/core"
import { CoinbaseWallet } from "@web3-react/coinbase-wallet"

import { ConnectionType, onConnectionError } from "./connections"
import { URLS } from './constants'

const INFURA_PROJECT_ID =
    process.env.REACT_APP_INFURA_PROJECT_ID || "c1a9ac9c4eaa432d99aa1dbf8ca7552c";

export function buildCoinbaseWalletConnector() {
    const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector(
        actions =>
            new CoinbaseWallet({
                actions,
                options: {
                    url: `https://arbitrum-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
                    appName: "Connect Financial",
                    reloadOnDisconnect: false
                },
                onError: onConnectionError
            })
    )

    console.log("URLS", URLS);

    const coinbaseWalletConnection = {
        connector: web3CoinbaseWallet,
        hooks: web3CoinbaseWalletHooks,
        type: ConnectionType.COINBASE_WALLET
    }

    return coinbaseWalletConnection
}
