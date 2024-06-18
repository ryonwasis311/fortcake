import React from 'react'
import {
    Text,
    Box,
    Flex,
    DiscordIcon,
    TelegramIcon,
    TwitterIcon,
    LinkExternal,
    CopyToClipboard,
    darkColors,
    lightColors,
} from 'fortcake-uikit-v2'
import styled, { keyframes, css } from 'styled-components'
import { Game } from '../../../../../state/types'
import { WebIcon, AppleIcon, AndroidIcon } from '../../../../../assets/images/gamelist'
import useTheme from '../../../../../hooks/useTheme'
import { Platforms } from '../../types'

type ActionPanelTypes = Partial<
    Pick<Game, 'address' | 'subtitle' | 'cta' | 'twitter' | 'telegram' | 'discord' | 'platform'>
>
export interface ActionPanelProps {
    details?: ActionPanelTypes
    expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded: any }>`
  animation: ${({ expanded }) =>
        expanded
            ? css`
          ${expandAnimation} 200ms linear forwards
        `
            : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    /* flex-direction: row; */
  }
`

const TokenInfo = styled(Flex)`
  flex-direction: column;
  padding: 24px 12px 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 2em;
    flex-direction: row;
    margin-bottom: 20px;
    padding: 32px 32px 0;
    div.header {
      margin-bottom: 10px;
    }
  }
  > div {
    margin-bottom: 15px;
    > div.header {
      font-weight: 600;
      margin-bottom: 4px;
    }
  }
`

const TokenText = styled.div`
  padding: 0 12px 24px;
  min-height: 140px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 32px 60px;
    min-height: initial;
  }
`

const StyledText = styled(Text)`
  /* min-height: 200px; */
  justify-self: center;
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: initial;
    justify-self: initial;
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, expanded }) => {

    return (
        <Container expanded={expanded}>
            <TokenInfo>
                <Box>
                    <Text className="header">Contract Address</Text>
                    <Flex alignItems="center">
                        <LinkExternal href={`https://bscscan.com/address/${details?.address}`}>
                            {`${details?.address?.slice(0, 4)}...${details?.address?.slice(details?.address?.length - 4)}`}
                        </LinkExternal>
                        <Box minWidth={60}>
                            <CopyToClipboard toCopy={details?.address as string} />
                        </Box>
                    </Flex>
                </Box>
                <Box>
                    <Text className="header">Website</Text>
                    <LinkExternal href={details?.cta}>{details?.cta}</LinkExternal>
                </Box>
                <Box>
                    <Text className="header">Community</Text>
                    <Flex>
                        {details?.twitter && (
                            <a href={details?.twitter} target="_blank" rel="noreferrer">
                                <TwitterIcon height={18} mr={2} />
                            </a>
                        )}
                        {details?.telegram && (
                            <a href={details?.telegram} target="_blank" rel="noreferrer">
                                <TelegramIcon height={18} mr={2} />
                            </a>
                        )}
                        {details?.discord && (
                            <a href={details?.discord} target="_blank" rel="noreferrer">
                                <DiscordIcon height={18} mr={2} />
                            </a>
                        )}
                    </Flex>
                </Box>
                <Box>
                    <Text className="header">Platform</Text>
                    <Flex>
                        {details?.platform?.map((p: any) => (
                            <PlatformIcon key={p} platform={p} />
                        ))}
                    </Flex>
                </Box>
            </TokenInfo>
            <TokenText>
                <Flex flexDirection="column">
                    <StyledText>{details?.subtitle}</StyledText>
                </Flex>
            </TokenText>
        </Container>
    )
}

const PlatformIcon = ({ platform }: { platform: string }) => {
    const { isDark } = useTheme()

    switch (platform) {
        case Platforms.WEB:
            return <WebIcon height={18} fill={isDark ? darkColors.text : lightColors.text} mr={2} />
        case Platforms.ANDROID:
            return <AndroidIcon height={18} fill={isDark ? darkColors.text : lightColors.text} mr={2} />
        default:
            return <AppleIcon height={18} fill={isDark ? darkColors.text : lightColors.text} mr={2} />
    }
}

export default ActionPanel
