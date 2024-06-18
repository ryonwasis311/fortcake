import React, { useMemo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Providers from './Providers';
import useActiveWeb3React from './hooks/useActiveWeb3React'
import { BLOCKED_ADDRESSES } from './config/constants'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const Updaters = () => {
    return (
        <>
            <ListsUpdater />
            <TransactionUpdater />
            <MulticallUpdater />
        </>
    )
}

const Blocklist = ({ children }: { children: ReactNode }) => {
    const { account } = useActiveWeb3React()
    const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
    if (blocked) {
        return <div>Blocked address</div>
    }
    return <>{children}</>
}

root.render(
    <React.StrictMode>
        <Providers>
            <Blocklist>
                <Updaters />
                <App />
            </Blocklist>
        </Providers>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
