import React from "react";
import { ModalProvider, light, dark } from "fortcake-uikit-v2";
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import store from "./state";
import { useThemeManager } from './state/user/hooks'
import { ToastsProvider } from "./contexts/ToastsContext";
import { LanguageProvider } from './contexts/Localization'
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { PRIORITIZED_CONNECTORS } from "./utils/connectors/connections"

const ThemeProviderWrapper = (props: any) => {
    const [isDark] = useThemeManager();
    return <ThemeProvider theme={isDark ? dark : light}{...props} />
}

interface ProviderProps {
    children: React.ReactNode
}

const ModalProviderWrapper: React.FC<{ children: React.ReactNode }> = ModalProvider;

const Providers: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Web3ReactProvider connectors={PRIORITIZED_CONNECTORS.map((connector) => [
            connector.connector,
            connector.hooks,
        ])}>
            <Provider store={store}>
                <ToastsProvider>
                    <HelmetProvider>
                        <ThemeProviderWrapper>
                            <LanguageProvider>
                                <RefreshContextProvider>
                                    <ModalProviderWrapper>
                                        {children}
                                    </ModalProviderWrapper>
                                </RefreshContextProvider>
                            </LanguageProvider>
                        </ThemeProviderWrapper>
                    </HelmetProvider>
                </ToastsProvider>
            </Provider>
        </Web3ReactProvider>
    )
}

export default Providers;