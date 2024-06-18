import { initializeConnector } from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { ConnectionType, onConnectionError } from "./connections"

export function buildInjectedConnector() {
    let metaMaskErrorHandler: any

    function onMetamaskError(error: any) {
        onConnectionError(error)
        metaMaskErrorHandler?.(error)
    }

    const [web3MetamaskWallet, web3MetamaskWalletHooks] = initializeConnector(
        actions => new MetaMask({ actions, onError: onMetamaskError })
    )

    const injectedConnection = {
        connector: web3MetamaskWallet,
        hooks: web3MetamaskWalletHooks,
        type: ConnectionType.INJECTED
    }

    return injectedConnection
}
