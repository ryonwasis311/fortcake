import React from 'react'
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, connectorLocalStorageKey, ConnectorNames } from 'fortcake-uikit-v2'
import { useWeb3React } from '@web3-react/core'
import { FetchStatus, useGetBnbBalance } from '../../../hooks/useTokenBalance'
// import useTokenBalance, { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import useAuth from '../../../hooks/useAuth'
import { useTranslation } from '../../../contexts/Localization'
import { getBscScanLink } from '../../../utils'
import { formatBigNumber } from '../../../utils/formatBalance'
// import { getFullDisplayBalance, formatBigNumber } from 'utils/formatBalance'
// import tokens from 'config/constants/tokens'
import { Text } from '../../../views/Swap/components/styleds'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
    hasLowBnbBalance: boolean
    onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
    const { t } = useTranslation()
    const { account } = useWeb3React()
    const { balance, fetchStatus } = useGetBnbBalance()
    // const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useTokenBalance(tokens.cake.address)
    const { logout } = useAuth()

    const handleLogout = () => {
        if (onDismiss)
            onDismiss()
        logout()
    }

    return (
        <>
            <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
                {t('Your Address')}
            </Text>
            <CopyAddress account={account as string} mb="24px" />
            {hasLowBnbBalance && (
                <>
                    <Message variant="warning" mb="24px" />
                    <Box>
                        <Text fontWeight="bold">{t('BNB Balance Low')}</Text>
                        <Text as="p">{t('You need BNB for transaction fees.')}</Text>
                    </Box>
                </>
            )}
            <Flex alignItems="center" justifyContent="space-between">
                <Text color="textSubtle">{t('BNB Balance')}</Text>
                {fetchStatus !== FetchStatus.SUCCESS ? (
                    <Skeleton height="22px" width="60px" />
                ) : (
                    <Text>{formatBigNumber(balance, 6)}</Text>
                )}
            </Flex>
            {/* <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="textSubtle">{t('CAKE Balance')}</Text>
        {cakeFetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{getFullDisplayBalance(cakeBalance, 18, 3)}</Text>
        )}
      </Flex> */}
            <Flex alignItems="center" justifyContent="end" mb="24px">
                <LinkExternal href={getBscScanLink(account as string | number, 'address')}>{t('View on BscScan')}</LinkExternal>
            </Flex>
            <Button variant="secondary" width="100%" onClick={handleLogout}>
                {t('Disconnect Wallet')}
            </Button>
        </>
    )
}

export default WalletInfo
