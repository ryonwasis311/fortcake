import { useCallback } from 'react'
import { ConnectorNames, connectorLocalStorageKey } from 'fortcake-uikit-v2'
import useToast from '../hooks/useToast'
import { useAppDispatch } from '../state'
import { useTranslation } from '../contexts/Localization'
import { switchNetwork, disconnectNetwork } from '../utils/connectors/connections'

const useAuth = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { toastError } = useToast()
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID as string, 10)

    const login = useCallback(
        async (connectorID: ConnectorNames) => {
            window.localStorage.setItem(connectorLocalStorageKey, connectorID);

            switchNetwork(chainId, connectorID).then((data) => {
                if (!data.success) {
                    const error = data.error as any;
                    toastError(error.title as string, error.message as string);
                }
            })
        },
        [t],
    )

    const logout = useCallback(() => {
        const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames
        disconnectNetwork(connectorId);
    }, [dispatch, chainId])

    return { login, logout }
}

export default useAuth
