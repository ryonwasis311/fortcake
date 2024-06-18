import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from '../../state'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getBalanceAmount } from '../../utils/formatBalance'
import { farmsConfig } from '../../config/constants'
import { useSlowFresh, useFastFresh } from '../../hooks/useRefresh'
import { deserializeToken } from '../../state/user/hooks/helpers'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, nonArchivedFarms } from '.'
import { State, SerializedFarm, DeserializedFarmUserData, DeserializedFarm, DeserializedFarmsState } from '../types'

const deserializeFarmUserData = (farm: SerializedFarm): DeserializedFarmUserData => {
    return {
        allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
        tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
        stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
        earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
    }
}

const deserializeFarm = (farm: SerializedFarm): DeserializedFarm => {
    const { lpAddresses, lpSymbol, pid, dual, multiplier, isCommunity, quoteTokenPriceBusd, tokenPriceBusd } = farm

    return {
        lpAddresses,
        lpSymbol,
        pid,
        dual,
        multiplier,
        isCommunity,
        quoteTokenPriceBusd,
        tokenPriceBusd,
        token: deserializeToken(farm.token),
        quoteToken: deserializeToken(farm.quoteToken),
        userData: deserializeFarmUserData(farm),
        tokenAmountTotal: farm.tokenAmountTotal ? new BigNumber(farm.tokenAmountTotal) : BIG_ZERO,
        lpTotalInQuoteToken: farm.lpTotalInQuoteToken ? new BigNumber(farm.lpTotalInQuoteToken) : BIG_ZERO,
        lpTotalSupply: farm.lpTotalSupply ? new BigNumber(farm.lpTotalSupply) : BIG_ZERO,
        tokenPriceVsQuote: farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO,
        poolWeight: farm.poolWeight ? new BigNumber(farm.poolWeight) : BIG_ZERO,
    }
}

export const usePollFarmsPublicData = (includeArchive = false) => {
    const dispatch = useAppDispatch()
    const slowRefresh = useSlowFresh()

    useEffect(() => {
        const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
        const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid as number)

        // TODO - UNCOMMENT
        // dispatch(fetchFarmsPublicDataAsync(pids))
    }, [includeArchive, dispatch, slowRefresh])
}

export const usePollFarmsWithUserData = (includeArchive = false) => {
    const dispatch = useAppDispatch()
    const slowRefresh = useSlowFresh()
    const { account } = useWeb3React()

    useEffect(() => {
        const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
        const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid as number)

        // TODO - UNCOMMENT
        // dispatch(fetchFarmsPublicDataAsync(pids))

        if (account) {
            // dispatch(fetchFarmUserDataAsync({ account, pids }))
        }
    }, [includeArchive, dispatch, slowRefresh, account])
}

/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP
 * 252 = BUSD-BNB LP
 */
export const usePollCoreFarmData = () => {
    const dispatch = useAppDispatch()
    const fastRefresh = useFastFresh()

    useEffect(() => {
        // TODO - UNCOMMENT
        // dispatch(fetchFarmsPublicDataAsync([251, 252]))
    }, [dispatch, fastRefresh])
}

export const useFarms = (): DeserializedFarmsState => {
    const farms = useSelector((state: State) => state.farms)
    const deserializedFarmsData = farms.data.map(deserializeFarm)
    const { loadArchivedFarmsData, userDataLoaded } = farms
    return {
        loadArchivedFarmsData,
        userDataLoaded,
        data: deserializedFarmsData,
    }
}

export const useFarmFromPid = (pid: number): DeserializedFarm => {
    const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
    return deserializeFarm(farm as SerializedFarm)
}

export const useFarmFromLpSymbol = (lpSymbol: string): DeserializedFarm => {
    const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
    return deserializeFarm(farm as SerializedFarm)
}

export const useFarmUser = (pid: any): DeserializedFarmUserData => {
    const { userData } = useFarmFromPid(pid)
    // const { allowance, tokenBalance, stakedBalance, earnings } = userData
    return {
        allowance: userData?.allowance as BigNumber,
        tokenBalance: userData?.tokenBalance as BigNumber,
        stakedBalance: userData?.stakedBalance as BigNumber,
        earnings: userData?.earnings as BigNumber,
    }
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
    const farm = useFarmFromPid(pid)
    return farm && new BigNumber(farm.tokenPriceBusd as string)
}

export const useLpTokenPrice = (symbol: string) => {
    const farm = useFarmFromLpSymbol(symbol)
    const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid as number)
    let lpTokenPrice = BIG_ZERO

    if (farm.lpTotalSupply?.gt(0) && farm.lpTotalInQuoteToken?.gt(0)) {
        // Total value of base token in LP
        const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal as BigNumber)
        // Double it to get overall value in LP
        const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
        // Divide total value of all tokens, by the number of LP tokens
        const totalLpTokens = getBalanceAmount(farm.lpTotalSupply)
        lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
    }

    return lpTokenPrice
}

/**
 * @@deprecated use the BUSD hook in /hooks
 */
export const usePriceCakeBusd = (): BigNumber => {
    const cakeBnbFarm = useFarmFromPid(251)

    const cakePriceBusdAsString = cakeBnbFarm.tokenPriceBusd

    const cakePriceBusd = useMemo(() => {
        return new BigNumber(cakePriceBusdAsString as string)
    }, [cakePriceBusdAsString])

    return cakePriceBusd
}
