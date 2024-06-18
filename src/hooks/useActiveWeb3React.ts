import { useEffect, useState, useRef } from 'react'
import { useWeb3React, Web3ContextType } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { simpleRpcProvider } from '../utils/providers'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ContextType<Web3Provider> => {
    const { provider, chainId, ...web3React } = useWeb3React()
    // const refEth = useRef(library)
    // const [provider, setProvider] = useState(library || simpleRpcProvider)

    // useEffect(() => {
    //     if (library !== refEth.current) {
    //         setProvider(library || simpleRpcProvider)
    //         refEth.current = library
    //     }
    // }, [library])

    return { provider: provider, chainId: chainId ?? parseInt(String(process.env.REACT_APP_CHAIN_ID), 10), ...web3React }
}

export default useActiveWeb3React
