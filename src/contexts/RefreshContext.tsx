import React, { useState, ReactNode, Children } from 'react'
import useInterval from '../hooks/useInterval'
import useIsWindowVisible from '../hooks/useIsWindowVisible'

const FAST_INTERVAL = 10000
const SLOW_INTERVAL = 60000

interface RefreshContextProps {
    children: ReactNode;
}

interface RefreshContextProviderProps {
    children: ReactNode;
}

const createRefreshContext = (interval: number) => {
    const RefreshContext = React.createContext(0)
    return {
        Context: RefreshContext,
        Provider: ({ children }: RefreshContextProps) => {
            const [count, setCount] = useState(0)

            useInterval(
                () => {
                    setCount((c) => c + 1)
                },
                // useIsWindowVisible ? interval : null,
                interval,
                false,
            )

            return <RefreshContext.Provider value={count}>{children}</RefreshContext.Provider>
        },
    }
}

export const SlowRefresh = createRefreshContext(SLOW_INTERVAL)
export const FastRefresh = createRefreshContext(FAST_INTERVAL)



const RefreshContextProvider = ({ children }: RefreshContextProviderProps) => {
    return (
        <SlowRefresh.Provider>
            <FastRefresh.Provider>{children}</FastRefresh.Provider>
        </SlowRefresh.Provider>
    )
}

export { RefreshContextProvider }
