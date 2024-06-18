import { useMemo } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import {
    getBep20Contract,
    getCakeContract,
    getBunnyFactoryContract,
    getBunnySpecialContract,
    getPancakeRabbitContract,
    getProfileContract,
    getIfoV1Contract,
    getIfoV2Contract,
    getMasterchefContract,
    getPointCenterIfoContract,
    getSouschefContract,
    getClaimRefundContract,
    getTradingCompetitionContract,
    getTradingCompetitionContractV2,
    getEasterNftContract,
    getErc721Contract,
    getCakeVaultContract,
    getIfoPoolContract,
    getPredictionsContract,
    getChainlinkOracleContract,
    getSouschefV2Contract,
    getLotteryV2Contract,
    getBunnySpecialCakeVaultContract,
    getBunnySpecialPredictionContract,
    getFarmAuctionContract,
    getBunnySpecialLotteryContract,
    getAnniversaryAchievementContract,
    getNftMarketContract,
    getNftSaleContract,
    getPancakeSquadContract,
    getErc721CollectionContract,
    getBunnySpecialXmasContract,
} from '../utils/contractHelpers'
import { getMulticallAddress } from '../utils/addressHelpers'
import { VaultKey } from '../state/types'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '@pancakeswap/sdk'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import ENS_PUBLIC_RESOLVER_ABI from '../config/abi/ens-public-resolver.json'
import ENS_ABI from '../config/abi/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract, getProviderOrSigner } from '../utils'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
    const { provider } = useActiveWeb3React()

    return useMemo(() => getIfoV1Contract(address, provider?.getSigner()), [address, provider])
}

export const useIfoV2Contract = (address: string) => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getIfoV2Contract(address, provider?.getSigner()), [address, provider])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
    const { provider, account } = useActiveWeb3React()
    return useMemo(
        () => getBep20Contract(address, (withSignerIfPossible ? getProviderOrSigner(provider as Web3Provider, account) : undefined)),
        [account, address, provider, withSignerIfPossible],
    )
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getErc721Contract(address, provider?.getSigner()), [address, provider])
}


export const useCake = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getCakeContract(provider?.getSigner()), [provider])
}

export const useBunnyFactory = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getBunnyFactoryContract(provider?.getSigner() ), [provider])
}

export const usePancakeRabbits = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getPancakeRabbitContract(provider?.getSigner() ), [provider])
}

export const useProfile = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getProfileContract(provider?.getSigner()), [provider])
}

export const useLotteryV2Contract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getLotteryV2Contract(provider?.getSigner()), [provider])
}

export const useMasterchef = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getMasterchefContract(provider?.getSigner()), [provider])
}

export const useSousChef = (id: any) => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getSouschefContract(id, provider?.getSigner()), [id, provider])
}

export const useSousChefV2 = (id: any) => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getSouschefV2Contract(id, provider?.getSigner()), [id, provider])
}

export const usePointCenterIfoContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getPointCenterIfoContract(provider?.getSigner()), [provider])
}

export const useBunnySpecialContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getBunnySpecialContract(provider?.getSigner()), [provider])
}

export const useClaimRefundContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getClaimRefundContract(provider?.getSigner()), [provider])
}

export const useTradingCompetitionContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getTradingCompetitionContract(provider?.getSigner()), [provider])
}

export const useTradingCompetitionContractV2 = (withSignerIfPossible = true) => {
    const { provider, account } = useActiveWeb3React()
    return useMemo(
        () => getTradingCompetitionContractV2(withSignerIfPossible ? getProviderOrSigner(provider as Web3Provider, account) : undefined),
        [provider, withSignerIfPossible, account],
    )
}

export const useEasterNftContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getEasterNftContract(provider?.getSigner()), [provider])
}

export const useVaultPoolContract = (vaultKey: VaultKey) => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => {
        return vaultKey === VaultKey.CakeVault
            ? getCakeVaultContract(provider?.getSigner())
            : getIfoPoolContract(provider?.getSigner())
    }, [provider, vaultKey])
}

export const useCakeVaultContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getCakeVaultContract(provider?.getSigner()), [provider])
}

export const useIfoPoolContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getIfoPoolContract(provider?.getSigner()), [provider])
}

export const usePredictionsContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getPredictionsContract(provider?.getSigner()), [provider])
}

export const useChainlinkOracleContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getChainlinkOracleContract(provider?.getSigner()), [provider])
}

export const useSpecialBunnyCakeVaultContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getBunnySpecialCakeVaultContract(provider?.getSigner()), [provider])
}

export const useSpecialBunnyPredictionContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getBunnySpecialPredictionContract(provider?.getSigner()), [provider])
}

export const useBunnySpecialLotteryContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getBunnySpecialLotteryContract(provider?.getSigner()), [provider])
}

export const useBunnySpecialXmasContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getBunnySpecialXmasContract(provider?.getSigner()), [provider])
}

export const useAnniversaryAchievementContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getAnniversaryAchievementContract(provider?.getSigner()), [provider])
}

export const useNftSaleContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getNftSaleContract(provider?.getSigner()), [provider])
}

export const usePancakeSquadContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getPancakeSquadContract(provider?.getSigner()), [provider])
}

export const useFarmAuctionContract = () => {
    const { account, provider } = useActiveWeb3React()
    // This hook is slightly different from others
    // Calls were failing if unconnected user goes to farm auction page
    // Using library instead of library.getSigner() fixes the problem for unconnected users
    // However, this fix is not ideal, it currently has following behavior:
    // - If you visit Farm Auction page coming from some other page there are no errors in console (unconnected or connected)
    // - If you go directly to Farm Auction page
    //   - as unconnected user you don't see any console errors
    //   - as connected user you see `unknown account #0 (operation="getAddress", code=UNSUPPORTED_OPERATION, ...` errors
    //     the functionality of the page is not affected, data is loading fine and you can interact with the contract
    //
    // Similar behavior was also noticed on Trading Competition page.
    return useMemo(() => getFarmAuctionContract((account ? provider?.getSigner() : provider)), [provider, account])
}

export const useNftMarketContract = () => {
    const { provider } = useActiveWeb3React()
    return useMemo(() => getNftMarketContract(provider?.getSigner()), [provider])
}

export const useErc721CollectionContract = (collectionAddress: string, withSignerIfPossible = true) => {
    const { provider, account } = useActiveWeb3React()
    return useMemo(() => {
        return getErc721CollectionContract(
            withSignerIfPossible ? getProviderOrSigner(provider as Web3Provider, account) : undefined,
            collectionAddress,
        )
    }, [account, provider, collectionAddress, withSignerIfPossible])
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { provider, account } = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !provider) return null
        try {
            return getContract(address, ABI, withSignerIfPossible ? getProviderOrSigner(provider, account) : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, provider, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId ? WETH[chainId as keyof typeof WETH].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
    const { chainId } = useActiveWeb3React()
    let address: string | undefined
    if (chainId) {
        // eslint-disable-next-line default-case
        switch (chainId) {
            case ChainId.MAINNET:
            case ChainId.TESTNET:
                address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
                break
        }
    }
    return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
    return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(pairAddress, IUniswapV2Pair.abi, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
    return useContract(getMulticallAddress(), multiCallAbi, false)
}
