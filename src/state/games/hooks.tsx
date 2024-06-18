import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../state'
import { State, Game, GamesState } from '../types'
import { ChainProps, GameProps } from '../../views/Games/components/types'
import { fetchGames, fetchGamePrices } from '.'

const deserializeGame = (game: Game): GameProps => {
    const chain = {
        chain: game.chain,
        address: game.address,
    }

    const gameDetails = Object.keys(game)
        .filter((key) => key !== 'chain' && key !== 'address')
        .reduce((accumulator, current) => {
            const gameProperty = {
                [current]: game[current as keyof Game],
            }
            return { ...accumulator, ...gameProperty }
        }, {} as Omit<GameProps, 'chain'>)

    return {
        ...gameDetails,
        chain: [{ ...chain } as ChainProps],
    }
}

const createGameList = (gameList: Game[], allPrices: GamesState['prices']) => {
    const deserializedGames = gameList.reduce<GameProps[]>((arr, game) => {
        const symbolOnDiffChain = arr.findIndex(({ symbol }) => symbol === game.symbol)
        if (symbolOnDiffChain >= 0) {
            arr[symbolOnDiffChain].chain.push({ chain: game.chain, address: game.address as string })
            return arr
        }
        const deserializedGame = deserializeGame(game)

        const found = allPrices.find(({ address }) => {
            return address.toUpperCase() === game.address?.toUpperCase()
        })

        deserializedGame.price = found !== undefined ? found.price : allPrices[0].price

        arr.push(deserializedGame)

        return arr
    }, [])

    return deserializedGames.sort((a, b) => b.votes - a.votes)
}

export const useFetchGames = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        /**
         * TODO - UNCOMMENT
         */
        // dispatch(fetchGames())
    }, [dispatch])
}

export const useFetchGamePrices = () => {
    const { data, isLoading } = useSelector((state: State) => state.games)
    const dispatch = useAppDispatch()
    useEffect(() => {
        /**
         * TODO - UNCOMMENT
         */

        // console.log("---ABCD---");
        // let timer: any
        // if (data.length && !isLoading) {
        //     dispatch(fetchGamePrices())
        //     timer = setInterval(() => {
        //         dispatch(fetchGamePrices())
        //     }, 300000)
        // }

        // if (timer > 0)
        //     clearInterval(timer)
    }, [data.length, dispatch, isLoading])
}

export const useGames = () => {
    const { userDataLoaded, data, prices, isLoading } = useSelector((state: State) => state.games)
    const [allGames, setAllGames] = useState<GameProps[]>([])

    useEffect(() => {
        console.log("WOLF1", data)
        console.log("WOLF2", prices)
        const gamesWithPrices = createGameList(data, prices)
        setAllGames(gamesWithPrices)
    }, [data, prices])

    return {
        isLoading,
        userDataLoaded,
        data: allGames,
    }
}
