import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChainId, Pair, Token } from '@pancakeswap/sdk'
import flatMap from 'lodash/flatMap'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useAllTokens } from '../../../hooks/Tokens'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../../config/constants'
import { AppDispatch, AppState } from '../../index'
import {
    addSerializedPair,
    addSerializedToken,
    // FarmStakedOnly,
    muteAudio,
    removeSerializedToken,
    SerializedPair,
    toggleTheme as toggleThemeAction,
    unmuteAudio,
    updateUserDeadline,
    updateUserExpertMode,
    // updateUserFarmStakedOnly,
    updateUserSingleHopOnly,
    updateUserSlippageTolerance,
    updateGasPrice,
    // addWatchlistToken,
    // addWatchlistPool,
    // updateUserPoolStakedOnly,
    // updateUserPoolsViewMode,
    // ViewMode,
    // updateUserFarmsViewMode,
    // updateUserPredictionChartDisclaimerShow,
    // updateUserPredictionAcceptedRisk,
    // updateUserUsernameVisibility,
    updateUserExpertModeAcknowledgementShow,
    // hidePhishingWarningBanner,
    // setIsExchangeChartDisplayed,
    // ChartViewMode,
    // setChartViewMode,
    setSubgraphHealthIndicatorDisplayed,
} from '../actions'
import { deserializeToken, GAS_PRICE_GWEI, serializeToken } from './helpers'
import CookiesNotice from '../../../components/CookiesNotice'

export function useAudioModeManager(): [boolean, () => void] {
    const dispatch = useDispatch<AppDispatch>()
    const audioPlay = useSelector<AppState, AppState['user']['audioPlay']>((state) => state.user.audioPlay)

    const toggleSetAudioMode = useCallback(() => {
        if (audioPlay) {
            dispatch(muteAudio())
        } else {
            dispatch(unmuteAudio())
        }
    }, [audioPlay, dispatch])

    return [audioPlay, toggleSetAudioMode]
}

export function useThemeManager(): [boolean, () => void] {
    const dispatch = useDispatch<AppDispatch>()
    const isDark = useSelector<AppState, AppState['user']['isDark']>((state) => !state.user.isDark)

    const toggleTheme = useCallback(() => {
        dispatch(toggleThemeAction())
    }, [dispatch])

    return [isDark, toggleTheme]
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const singleHopOnly = useSelector<AppState, AppState['user']['userSingleHopOnly']>(
        (state) => state.user.userSingleHopOnly,
    )

    const setSingleHopOnly = useCallback(
        (newSingleHopOnly: boolean) => {
            dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
        },
        [dispatch],
    )

    return [singleHopOnly, setSingleHopOnly]
}

export function useAddUserToken(): (token: Token) => void {
    const dispatch = useDispatch<AppDispatch>()
    return useCallback(
        (token: Token) => {
            dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
        },
        [dispatch],
    )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
    const dispatch = useDispatch<AppDispatch>()
    return useCallback(
        (chainId: number, address: string) => {
            dispatch(removeSerializedToken({ chainId, address }))
        },
        [dispatch],
    )
}

export function useUserSlippageTolerance(): [number, (slippage: number) => void] {
    const dispatch = useDispatch<AppDispatch>()
    const userSlippageTolerance = useSelector<AppState, AppState['user']['userSlippageTolerance']>((state) => {
        return state.user.userSlippageTolerance
    })

    const setUserSlippageTolerance = useCallback(
        (slippage: number) => {
            dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }))
        },
        [dispatch],
    )

    return [userSlippageTolerance, setUserSlippageTolerance]
}

export function useIsExpertMode(): boolean {
    return useSelector<AppState, AppState['user']['userExpertMode']>((state) => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
    const dispatch = useDispatch<AppDispatch>()
    const expertMode = useIsExpertMode()

    const toggleSetExpertMode = useCallback(() => {
        dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
    }, [expertMode, dispatch])

    return [expertMode, toggleSetExpertMode]
}

export function useSubgraphHealthIndicatorManager() {
    const dispatch = useDispatch<AppDispatch>()
    const isSubgraphHealthIndicatorDisplayed = useSelector<
        AppState,
        AppState['user']['isSubgraphHealthIndicatorDisplayed']
    >((state) => state.user.isSubgraphHealthIndicatorDisplayed)

    const setSubgraphHealthIndicatorDisplayedPreference = useCallback(
        (newIsDisplayed: boolean) => {
            dispatch(setSubgraphHealthIndicatorDisplayed(newIsDisplayed))
        },
        [dispatch],
    )

    return [isSubgraphHealthIndicatorDisplayed, setSubgraphHealthIndicatorDisplayedPreference] as const
}

export function useUserExpertModeAcknowledgementShow(): [boolean, (showAcknowledgement: boolean) => void] {
    const dispatch = useDispatch<AppDispatch>()
    const userExpertModeAcknowledgementShow = useSelector<
        AppState,
        AppState['user']['userExpertModeAcknowledgementShow']
    >((state) => {
        return state.user.userExpertModeAcknowledgementShow
    })

    const setUserExpertModeAcknowledgementShow = useCallback(
        (showAcknowledgement: boolean) => {
            dispatch(updateUserExpertModeAcknowledgementShow({ userExpertModeAcknowledgementShow: showAcknowledgement }))
        },
        [dispatch],
    )

    return [userExpertModeAcknowledgementShow, setUserExpertModeAcknowledgementShow]
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
    const dispatch = useDispatch<AppDispatch>()
    const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>((state) => {
        return state.user.userDeadline
    })

    const setUserDeadline = useCallback(
        (deadline: number) => {
            dispatch(updateUserDeadline({ userDeadline: deadline }))
        },
        [dispatch],
    )

    return [userDeadline, setUserDeadline]
}

export function useGasPrice(): string {
    const chainId = process.env.REACT_APP_CHAIN_ID
    const userGas = useSelector<AppState, AppState['user']['gasPrice']>((state) => state.user.gasPrice)
    return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
}

export function useGasPriceManager(): [string, (userGasPrice: string) => void] {
    const dispatch = useDispatch<AppDispatch>()
    const userGasPrice = useGasPrice()

    const setGasPrice = useCallback(
        (gasPrice: string) => {
            dispatch(updateGasPrice({ gasPrice }))
        },
        [dispatch],
    )

    return [userGasPrice, setGasPrice]
}

export const useShowCookiesNotice = () => {
    const { userAcceptedCookies } = useSelector<AppState, AppState['user']>((state) => state.user)
    const [presentModal] = CookiesNotice()
    const [state, setState] = useState(userAcceptedCookies)

    const handler = useCallback(() => {
        if (!state) {
            presentModal()
            setState(true)
        }
    }, [presentModal, state])

    useEffect(() => {
        handler()
    }, [handler])
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
    return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'Cake-LP', 'Pancake LPs')
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
    const { chainId } = useActiveWeb3React()
    const tokens = useAllTokens()

    // pinned pairs
    const pinnedPairs = useMemo(() => ((chainId && (chainId === ChainId.MAINNET || chainId === ChainId.TESTNET)) ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

    // pairs for every token against every base
    const generatedPairs: [Token, Token][] = useMemo(
        () =>
            (chainId && ((chainId === ChainId.MAINNET || chainId === ChainId.TESTNET)))
                ? flatMap(Object.keys(tokens), (tokenAddress) => {
                    const token = tokens[tokenAddress]
                    // for each token on the current chain,
                    return (
                        // loop though all bases on the current chain
                        (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                            // to construct pairs of the given token with each base
                            .map((base) => {
                                if (base.address === token.address) {
                                    return null
                                }
                                return [base, token]
                            })
                            .filter((p): p is [Token, Token] => p !== null)
                    )
                })
                : [],
        [tokens, chainId],
    )

    // pairs saved by users
    const savedSerializedPairs = useSelector<AppState, AppState['user']['pairs']>(({ user: { pairs } }) => pairs)

    const userPairs: [Token, Token][] = useMemo(() => {
        if (!chainId || !savedSerializedPairs) return []
        const forChain = savedSerializedPairs[chainId]
        if (!forChain) return []

        return Object.keys(forChain).map((pairId) => {
            return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
        })
    }, [savedSerializedPairs, chainId])

    const combinedList = useMemo(
        () => userPairs.concat(generatedPairs).concat(pinnedPairs),
        [generatedPairs, pinnedPairs, userPairs],
    )

    return useMemo(() => {
        // dedupes pairs of tokens in the combined list
        const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
            const sorted = tokenA.sortsBefore(tokenB)
            const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
            if (memo[key]) return memo
            memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
            return memo
        }, {})

        return Object.keys(keyed).map((key) => keyed[key])
    }, [combinedList])
}

function serializePair(pair: Pair): SerializedPair {
    return {
        token0: serializeToken(pair.token0),
        token1: serializeToken(pair.token1),
    }
}

export function usePairAdder(): (pair: Pair) => void {
    const dispatch = useDispatch<AppDispatch>()

    return useCallback(
        (pair: Pair) => {
            dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
        },
        [dispatch],
    )
}

export const useUserSelector = () => useSelector<AppState, AppState['user']>((state) => state.user)