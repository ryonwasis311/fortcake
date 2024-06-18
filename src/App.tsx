import React, { lazy, PropsWithChildren } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResetCSS } from 'fortcake-uikit-v2'
import BigNumber from 'bignumber.js'

import GlobalStyle from './style/Global';

import Games from './views/Games';
import Privacy from './views/Privacy';
import Terms from './views/Terms';
import Cookies from './views/Cookies';

import Swap from './views/Swap';
// import RedirectToSwap from './views/Swap/redirects';
import AddLiquidity from './views/AddLiquidity';
import Pool from './views/Pool';
import PoolFinder from './views/PoolFinder';

import Menu from './components/Menu';
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from './components/Loader/PageLoader'
import SubgraphHealthIndicator from './components/SubgraphHealthIndicator'
import EasterEgg from './components/EasterEgg'

import { usePollBlockNumber } from './state/block/hooks'
import { usePollCoreFarmData } from './state/farms/hooks'
import { useFetchProfile } from './state/profile/hooks'
import { useFetchGames } from './state/games/hooks'
import { useShowCookiesNotice } from './state/user/hooks'

import { ToastListener } from './contexts/ToastsContext'

import useEagerConnect from './hooks/useEagerConnect'
import useScrollOnRouteChange from './hooks/useScrollOnRouteChange'
import useUserAgent from './hooks/useUserAgent'
import useClickyAnalytics from './hooks/useClickyAnalytics'

import './App.css';

BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80,
})

const Home = lazy(() => import('./views/FortCakeHome/Home'));

window.Buffer = window.Buffer || require("buffer").Buffer;


declare module "fortcake-uikit-v2" {
    export interface UserMenuProps extends PropsWithChildren { }
    export interface BreadcrumbsProps extends PropsWithChildren { }
    export interface MessageProps extends PropsWithChildren { }
    export interface TagProps extends PropsWithChildren { }
}


const App: React.FC = () => {
    usePollBlockNumber()
    useEagerConnect()
    useFetchProfile()
    usePollCoreFarmData()
    useScrollOnRouteChange()
    useUserAgent()
    useFetchGames()
    useClickyAnalytics()
    useShowCookiesNotice()

    return (
        <BrowserRouter>
            <ResetCSS />
            <GlobalStyle />
            <GlobalCheckClaimStatus excludeLocations={[]} />
            <Menu>
                <SuspenseWithChunkError fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/play" element={<Games />}></Route>
                        <Route path="/Cookies" element={<Cookies />}></Route>
                        <Route path="/Terms" element={<Terms />}></Route>
                        <Route path="/Privacy" element={<Privacy />}></Route>
                        <Route path="/Cookies" element={<Cookies />}></Route>
                        <Route path="/swap" element={<Swap />}></Route>
                        <Route path="/swap/:outputCurrency" element={<Swap />}></Route>
                        {/* <Route path="/swap/:outputCurrency" element={<RedirectToSwap />}></Route> */}
                        <Route path="/pool" element={<Pool />}></Route>
                        <Route path="/find" element={<PoolFinder />}></Route>
                        <Route path="/add" element={<AddLiquidity />}></Route>
                        <Route path="/add/:currencyIdA" element={<AddLiquidity />}></Route>
                        <Route path="/add/:currencyIdA/:currencyIdB" element={<AddLiquidity />}></Route>
                    </Routes>
                </SuspenseWithChunkError>
            </Menu>
            <EasterEgg iterations={2} />
            <ToastListener />
            <SubgraphHealthIndicator />
        </BrowserRouter>
    );
}

export default App;
