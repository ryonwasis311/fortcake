import { initializeConnector } from "@web3-react/core"
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2"
import { ConnectionType, onConnectionError } from './connections'
import { MAINNET_CHAINS } from "./constants"

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number)

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID as string, 10)

export function buildWalletConnectConnector() {
    const [walletConnectV2, walletConnectV2hooks] = initializeConnector(
        actions =>
            new WalletConnectV2({
                actions,
                options: {
                    projectId: String(process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID),
                    chains: [chainId],
                    showQrModal: true
                },
                onError: onConnectionError
            })
    )

    const walletConnectConnection = {
        connector: walletConnectV2,
        hooks: walletConnectV2hooks,
        type: ConnectionType.WALLET_CONNECT
    }

    return walletConnectConnection
}