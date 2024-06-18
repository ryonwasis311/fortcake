// import { Connector } from "@web3-react/core/node_modules/@web3-react/types/dist/index"
import { buildInjectedConnector } from './metaMask'
import { buildCoinbaseWalletConnector } from './coinbaseWallet'
import { buildWalletConnectConnector } from './walletConnectV2'
import { buildBscConnector } from './bsc'
import { buildWalletLinkConnector } from './walletLink'
import { CHAINS } from './constants'

export const ConnectionType = {
    INJECTED: "injected",
    COINBASE_WALLET: "walletlink",
    WALLET_CONNECT: "walletconnect",
    BSC: "bsc",
    GNOSIS_SAFE: "GNOSIS_SAFE",
    NETWORK: "NETWORK",
}

export function getIsInjected() {
    return Boolean(window.ethereum)
}

export function getHasMetaMaskExtensionInstalled() {
    return window.ethereum?.isMetaMask ?? false
}

export function onConnectionError(error: any) {
    console.debug(`web3-react error: ${error}`)
}

export const PRIORITIZED_CONNECTORS = [
    buildInjectedConnector(),
    buildCoinbaseWalletConnector(),
    buildWalletConnectConnector(),
    buildBscConnector(),
    buildWalletLinkConnector()
]

export function getConnection(c: any) {
    // if (c instanceof Connector) {
    //     const connection = PRIORITIZED_CONNECTORS.find(
    //         connection => connection.connector === c
    //     )
    //     if (!connection) {
    //         throw Error("unsupported connector")
    //     }
    //     return connection
    // } else {
    switch (c) {
        case ConnectionType.INJECTED:
            return PRIORITIZED_CONNECTORS[0]
        case ConnectionType.COINBASE_WALLET:
            return PRIORITIZED_CONNECTORS[1]
        case ConnectionType.WALLET_CONNECT:
            return PRIORITIZED_CONNECTORS[2]
        case ConnectionType.BSC:
            return PRIORITIZED_CONNECTORS[3];
        default:
            break;
    }
    // }
}

export const switchNetwork = async (chainId: any, connectionType: string) => {
    if (!connectionType) {
        return {
            success: false,
            error: {
                title: "Unable to find connector",
                message: "The connector config is wrong"
            }
        }
    }

    const Connection: any = getConnection(connectionType)

    if (connectionType === ConnectionType.INJECTED) {
        try {
            await Connection.connector.activate()
        } catch (err: any) {
            return {
                success: false,
                error: err
            }
        }
        return {
            success: true
        }
    }

    if (
        connectionType === ConnectionType.WALLET_CONNECT ||
        connectionType === ConnectionType.NETWORK ||
        connectionType === ConnectionType.COINBASE_WALLET
    ) {
        try {
            await Connection.connector.activate(chainId)
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
        return {
            success: true
        }
    }

    const chainInfo = CHAINS[chainId as keyof typeof CHAINS]
    const addChainParameter = {
        chainId,
        chainName: chainInfo.name,
        rpcUrls: [chainInfo.urls],
        nativeCurrency: chainInfo.nativeCurrency,
        blockExplorerUrls: [chainInfo.blockExplorerUrls]
    }

    try {
        await Connection.connector.activate(addChainParameter)
    } catch (err) {
        return {
            success: false,
            error: err
        }
    }

    return {
        success: true
    }
}

export const disconnectNetwork = (connectionType: string) => {
    if (!connectionType) {
        return
    }

    const Connection: any = getConnection(connectionType)

    try {
        if (Connection.connector && Connection.connector.deactivate) {
            Connection.connector.deactivate()
        }
        Connection.connector.resetState()
    } catch (error) {
        console.debug(`web3-react disconnection error: ${error}`)
    }
}