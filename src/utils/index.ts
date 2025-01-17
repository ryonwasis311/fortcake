import { Contract } from '@ethersproject/contracts'
import { ethers, Signer } from 'ethers'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
// import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import IUniswapV2Router02ABIRouter from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { ChainId, Percent, Token, CurrencyAmount, Currency } from '@pancakeswap/sdk'
import JSBI from 'jsbi'
import { ROUTER_ADDRESS } from '../config/constants'
import { BASE_BSC_SCAN_URLS } from '../config'
import { TokenAddressMap } from '../state/lists/hooks'
import { simpleRpcProvider } from './providers'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

export function getBscScanLink(
    data: string | number,
    type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
    chainId: ChainId = ChainId.MAINNET,
): string {
    switch (type) {
        case 'transaction': {
            return `${BASE_BSC_SCAN_URLS[chainId as keyof typeof BASE_BSC_SCAN_URLS]}/tx/${data}`
        }
        case 'token': {
            return `${BASE_BSC_SCAN_URLS[chainId as keyof typeof BASE_BSC_SCAN_URLS]}/token/${data}`
        }
        case 'block': {
            return `${BASE_BSC_SCAN_URLS[chainId as keyof typeof BASE_BSC_SCAN_URLS]}/block/${data}`
        }
        case 'countdown': {
            return `${BASE_BSC_SCAN_URLS[chainId as keyof typeof BASE_BSC_SCAN_URLS]}/block/countdown/${data}`
        }
        default: {
            return `${BASE_BSC_SCAN_URLS[chainId as keyof typeof BASE_BSC_SCAN_URLS]}/address/${data}`
        }
    }
}

export function getBscScanLinkForNft(
    collectionAddress: string,
    tokenId: string,
    chainId: ChainId = ChainId.MAINNET,
): string {
    return `${BASE_BSC_SCAN_URLS[chainId as keyof typeof BASE_BSC_SCAN_URLS]}/token/${collectionAddress}?a=${tokenId}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
    return new Percent(JSBI.BigInt(num).toString(), JSBI.BigInt(10000).toString())
}

// export function calculateSlippageAmount(value: CurrencyAmount<Currency>, slippage: number): [JSBI, JSBI] {
export function calculateSlippageAmount(value: any, slippage: number): [JSBI, JSBI] {
    if (slippage < 0 || slippage > 10000) {
        throw Error(`Unexpected slippage value: ${slippage}`)
    }
    console.log("TODO");
    return [
        // TODO
        JSBI.divide(JSBI.multiply(JSBI.BigInt(Number(value.decimalScale)), JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
        JSBI.divide(JSBI.multiply(JSBI.BigInt(Number(value.decimalScale)), JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
    ]
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, signer?: ethers.Signer | ethers.providers.Provider): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, signer ?? simpleRpcProvider)
}

// account is optional
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
    return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABIRouter.abi, getProviderOrSigner(library, account))
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
    // if (currency === ETHER) return true
    return Boolean(currency instanceof Token && defaultTokens[currency.chainId as ChainId]?.[currency.address])
}
