import React from 'react'
import { Button, useWalletModal } from 'fortcake-uikit-v2'
import useAuth from '../hooks/useAuth'
import { useTranslation } from '../contexts/Localization'

const ConnectWalletButton = (props: any) => {
    const { t } = useTranslation()
    const { login, logout } = useAuth()
    const { onPresentConnectModal } = useWalletModal(login, logout, t)

    return (
        <Button onClick={onPresentConnectModal} {...props}>
            {t('Connect Wallet')}
        </Button>
    )
}

export default ConnectWalletButton
