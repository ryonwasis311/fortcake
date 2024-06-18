import React from 'react'
import { Text } from 'fortcake-uikit-v2'
import { useTranslation } from '../../../../contexts/Localization'

const BondlyWarning = () => {
    const { t } = useTranslation()

    return <Text>{t('Warning: BONDLY has been compromised. Please remove liquidity until further notice.')}</Text>
}

export default BondlyWarning
