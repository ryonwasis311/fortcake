import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../state'
import axios from 'axios'
import games from '../../config/constants/games'
import gamePrices from '../../config/constants/gamePrices'
import { GamesState, Game } from '../types'
import Airtable from "airtable"

// const airTableEndpoint = `https://api/fortcake.io/games`
const airTableEndpoint = `https://api.airtable.com/v0/apptoM5QsUhAwYfEM/Grid%20view`
const coinGeckoEndpoint = `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?vs_currencies=bnb,usd&contract_addresses=`
const token = `patKXgBPtnBO0ooIX.7305553d97c59adddf2464753feae724c859535660f440945f360dfd4af4d8e1`;
const token1  = `patEG7NtY8M2NPd93.5ae81e69d9a461f846c9b26f0e650d58ff15b69d903e8fcc73c4b3f8a3f719a2`
const initialState: GamesState = {
    data: games,
    userDataLoaded: false,
    prices: gamePrices,
    isLoading: false,
}

export const fetchGames = createAsyncThunk('Games/fetchGames', async () => {
    console.log("Hello", airTableEndpoint);
    // const { data } = await axios.get<Game[]>(airTableEndpoint)
    // console.log("Hello", data);
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: token1
    })

    var base = await Airtable.base(`apptoM5QsUhAwYfEM`);
    console.log("Hello", base);

    return games
})

export const fetchGamePrices = createAsyncThunk<any, void, { state: AppState }>(
    'Games/fetchGamePrices',
    async (_, { getState }) => {
        const {
            games: { data: allGames },
        } = getState()
        console.log("----BBBB1----", games);

        const reducedAddresses = allGames.reduce((addresses, game, index) => {
            let addrs = addresses
            addrs += `${game.address}${index === allGames.length - 1 ? '' : ','}`
            return addrs
        }, '')

        const geckoWithAllAddresses = coinGeckoEndpoint + reducedAddresses
        console.log("----BBBB2----", geckoWithAllAddresses);
        const { data } = await axios.get<{
            [address: string]: { bnb: string; usd: string }
        }>(geckoWithAllAddresses)

        console.log("----BBBB3----", data);
        const mappedPrices = Object.keys(data).map((address) => ({
            address,
            price: data[address],
        }))

        return mappedPrices
    },
)

export const gamesSlice = createSlice({
    name: 'Games',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                }
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    data: action.payload,
                }
            })
            .addCase(fetchGamePrices.pending, (state) => {
                return {
                    ...state,
                }
            })
            .addCase(fetchGamePrices.fulfilled, (state, action) => {
                return {
                    ...state,
                    prices: action.payload,
                }
            })
    },
})

export default gamesSlice.reducer
