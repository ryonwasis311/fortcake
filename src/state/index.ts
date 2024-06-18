import { configureStore } from "@reduxjs/toolkit";
// import { save, load } from 'redux-localstorage-simple'
import { load } from 'redux-localstorage-simple'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'

import gamesReducer from './games'
import blockReducer from './block'
import user, { initialState as userInitialState } from './user/reducer'
import transactions, { initialState as transactionsInitialState } from './transactions/reducer'
import swap from './swap/reducer'
import lists, { initialState as listsInitialState } from './lists/reducer'
import multicall from './multicall/reducer'
// import achievementsReducer from './achievements'
import farmsReducer from './farms'
import profileReducer, { initialState as profileInitialState } from './profile'
// import predictionsReducer from './predictions'
// import teamsReducer from './teams'
// import votingReducer from './voting'
// import lotteryReducer from './lottery'
// import infoReducer from './info'
import nftMarketReducer from './nftMarket/reducer'
import mint from './mint/reducer'
// import burn from './burn/reducer'

import { updateVersion } from './global/actions'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'profile']

const safeCloneDeep = <T>(state: T) => {
    try {
        return JSON.parse(JSON.stringify(state)) as T
    } catch (error) {
        console.error(error)
        return cloneDeep(state)
    }
}

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        // achievements: achievementsReducer,
        block: blockReducer,
        farms: farmsReducer,
        games: gamesReducer,
        // pools: poolsReducer,
        // predictions: predictionsReducer,
        profile: profileReducer,
        // teams: teamsReducer,
        // voting: votingReducer,
        // lottery: lotteryReducer,
        // info: infoReducer,
        nftMarket: nftMarketReducer,

        // Exchange
        user,
        transactions,
        swap,
        mint,
        // burn,
        multicall,
        lists,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}),
    preloadedState: load({
        states: PERSISTED_KEYS,
        preloadedState: {
            user: safeCloneDeep(userInitialState),
            transactions: safeCloneDeep(transactionsInitialState),
            lists: safeCloneDeep(listsInitialState),
            profile: safeCloneDeep(profileInitialState),
        },
    }),
})

store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
