import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    Skeleton,
    Text,
    Flex,
    Button,
    Image as Img,
    ChevronUpIcon,
    ChevronDownIcon,
    useMatchBreakpoints,
    BinanceIcon,
} from 'fortcake-uikit-v2'
import axios from 'axios'
import { GameImage } from '../../../../components/GameImage'
import { Link } from 'react-router-dom'
import useTheme from '../../../../hooks/useTheme'
import { GameProps, ChainProps } from '../types'
// import Select from '../Select'

import green from '../../../../assets/images/gamelist/greenfortcakesize.png'
import orange from '../../../../assets/images/gamelist/orangefortcakesize.png'
import red from '../../../../assets/images/gamelist/redfortcakesize.png'
import yellow from '../../../../assets/images/gamelist/yellowfortcakesize.png'

import ImgAvatarAxie from "../../../../assets/images/gameavatars/3_WQTQLpUOr0DcsC7Ygf5r_SnN1n-MIj-BvScoNRVxw.png"
import ImgAvatarDefi from "../../../../assets/images/gameavatars/jJvWG8MGA2aBnVP_J5h3duMcS0GVt10Jra2fXlBdouc.png"
import ImgAvatarAlien from "../../../../assets/images/gameavatars/S_kv_mjTEsnTpCMDyZj0XZxyC41v_NVSedvIbyZCbmY.png"
import ImgAvatarNeighbor from "../../../../assets/images/gameavatars/Qcv9c4dBJByxWDyD_5B4u9xWoMp0fEhcClc3VdwUvHc.png"
import ImgAvatarDalarnia from "../../../../assets/images/gameavatars/iIesnYmT30aaXrKhuPMNoW-aKAhtk-HJoiciduUSk4E.png"
import ImgAvatarMonsta from "../../../../assets/images/gameavatars/IePuYpNSe9I33Acqftp8gMnSfhSzAT_RJJQv-c1bdkU.png"
import ImgAvatarMaster from "../../../../assets/images/gameavatars/Y8WrL3D67NZ8G1EPUKiFqKVfCPC3m4YBYeJ5FUqaKwE.png"
import ImgAvatarPolychain from "../../../../assets/images/gameavatars/izGQ8te8MeKnWgUoyTO9zV1NAjj0aozxdSXpnzOZBbA.png"
import ImgAvatarBlade from "../../../../assets/images/gameavatars/NF_S8xB-U360T0jwE6JqNTakFeQ1v1YYLrJrOROPLU0.png"
import ImgAvatarFaraland from "../../../../assets/images/gameavatars/ZvCqqBbTDYz-stHkI_7pVtQCCiCK3yhsO4Z2WFhd7SY.png"
import ImgAvatarKawaii from "../../../../assets/images/gameavatars/CZEDx7aALq9ZKkR0JbKQiHtsi0xAZtFOPTGSJWZSCRQ.png"
import ImgAvatarBomb from "../../../../assets/images/gameavatars/F2d9NtHjn-tb1gcJTAXY-CP7xYMTSx9rauLjXxQZcoc.png"
import ImgAvatarBinapet from "../../../../assets/images/gameavatars/owidNMcktSR-JKHI-R8amRSCDTqKO3BMYuhzhiCrBu8.png"
import ImgAvatarSplinterlands from "../../../../assets/images/gameavatars/KkipI422aUyKm26rwloVntSejQZHast3XdRQV0VR7ds.png"
import ImgAvatarKryptomon from "../../../../assets/images/gameavatars/Pm8Ae87lujYJUyYMIZWEGWkYTBSA0IzDavYNp39fJBk.png"
import ImgAvatarBinamon from "../../../../assets/images/gameavatars/MfoVyjt5OdO8qXTVwgT8MhRa4jOVN6By2j81900rb2U.png"
import ImgAvatarCrusader from "../../../../assets/images/gameavatars/D6DXw7X9jTToXmvCgC67eAV8r6jay2jedRh6Ahdga84.png"
import ImgAvatarFortcake from "../../../../assets/images/gameavatars/FORTCAKE.png"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  width: 100%;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 0 0 16px;
    flex-direction: row;
  }
`

const TokenWrapper = styled.div`
  width: 100px;
  align-self: flex-end;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-right: 12px;
    align-self: center;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 18px;
  }
`

const CurrencyText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'lightblue' : '#4fa6c3')};
`

const Image = styled(GameImage)`
  width: 90px;
`

const FlexButton = styled(Flex)`
  margin-left: 4px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
  }
  &.links {
    margin-top: 20px;
    a:first-child {
      margin-right: 20px;
    }
  }
`

const FlexMobileContentWrapper = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
  }
`

const Rating: React.FC<{ votes: number }> = ({ votes }) => {
    const { isMobile } = useMatchBreakpoints()

    let ratingIcon: string

    if (votes > 24 && votes < 50) {
        ratingIcon = orange
    } else if (votes > 49 && votes < 75) {
        ratingIcon = yellow
    } else if (votes > 74) {
        ratingIcon = green
    } else {
        ratingIcon = red
    }

    return (
        <Flex alignItems="center" justifyContent="flex-end" width={isMobile ? '100%' : ''}>
            <Img src={ratingIcon} width={18} height={18} mr="8px" style={{ width: '18px' }} />
            <Text color="text" fontSize="1" fontWeight="bold" as="h3">
                {votes} %
            </Text>
        </Flex>
    )
}

const ChainAddress: React.FC<{ chain: ChainProps[] }> = ({ chain }) => {
    const url = `/swap/${chain[0].address}`

    return (
        <FlexButton className="chainAdress">
            <Button className="externalLinks" as={Link} variant="primary" scale="sm" mr="20px" to={url}>
                Swap
            </Button>
            {/* <Select options={options} onOptionChange={handleOptionChange} mr="20px" /> */}
        </FlexButton>
    )
}

const Game: React.FunctionComponent<GameProps & { actionPanelOpen: boolean }> = ({
    title,
    subtitle,
    logo,
    votes,
    cta,
    chain,
    actionPanelOpen,
    price,
    category,
}) => {
    const { isMobile, isTablet } = useMatchBreakpoints()
    const [base64, setBase64] = useState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
    const [imgLoading, setImgLoading] = useState(true)
    const { isDark } = useTheme()

    const categoryBtnStyle = {
        backgroundColor: !isDark ? '#a9a9a9' : "",
    }

    useEffect(() => {
        const controller = new AbortController()
        const fetchImg = async () => {
            try {
                const response = await axios.get(logo, {
                    responseType: 'arraybuffer',
                    signal: controller.signal,
                })
                const b64 = Buffer.from(response.data, 'binary').toString('base64')
                const src = `data:image/png;base64,${b64}`
                setBase64(src)
                setImgLoading(false)
            } catch (e) {
                console.info(e)
            }
        }

        fetchImg()

        return () => {
            controller.abort()
        }
    }, [logo])

    const renderAvatar = () => {
      if (title === "Axie Infinity") {
        return <img src={ImgAvatarAxie} style={{width: `90px`}} />;
      } else if (title === "My Defi Pet") {
        return <img src={ImgAvatarDefi} style={{width: `90px`}} />;
      } else if (title === "Alien Worlds") {
        return <img src={ImgAvatarAlien} style={{width: `90px`}} />;
      } else if (title === "My Neighbor Alice") {
        return <img src={ImgAvatarNeighbor} style={{width: `90px`}} />;
      } else if (title === "Mines of Dalarnia") {
        return <img src={ImgAvatarDalarnia} style={{width: `90px`}} />;
      } else if (title === "Monsta Infinite") {
        return <img src={ImgAvatarMonsta} style={{width: `90px`}} />;
      } else if (title === "My Master War") {
        return <img src={ImgAvatarMaster} style={{width: `90px`}} />;
      } else if (title === "Polychain Monsters") {
        return <img src={ImgAvatarPolychain} style={{width: `90px`}} />;
      } else if (title === "Crypto Blades") {
        return <img src={ImgAvatarBlade} style={{width: `90px`}} />;
      } else if (title === "Faraland") {
        return <img src={ImgAvatarFaraland} style={{width: `90px`}} />;
      } else if (title === "Kawaii Islands") {
        return <img src={ImgAvatarKawaii} style={{width: `90px`}} />;
      } else if (title === "Bomb Crypto") {
        return <img src={ImgAvatarBomb} style={{width: `90px`}} />;
      } else if (title === "BinaPet") {
        return <img src={ImgAvatarBinapet} style={{width: `90px`}} />;
      } else if (title === "Splinterlands") {
        return <img src={ImgAvatarSplinterlands} style={{width: `90px`}} />;
      } else if (title === "Kryptomon") {
        return <img src={ImgAvatarKryptomon} style={{width: `90px`}} />;
      } else if (title === "Binamon") {
        return <img src={ImgAvatarBinamon} style={{width: `90px`}} />;
      } else if (title === "Crusaders of Crypto") {
        return <img src={ImgAvatarCrusader} style={{width: `90px`}} />;
      } else {
        return <img src={ImgAvatarFortcake} style={{width: `90px`}} />
      }
    }

    const renderContent = () => {
        if (isMobile) {
            return (
                <>
                    <FlexMobileContentWrapper justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                        <TokenWrapper>
                            {/* {imgLoading ? (
                                <Skeleton variant="circle" animation="waves" width={90} height={90} />
                            ) : renderAvatar()} */}
                            {
                                renderAvatar()
                            }
                        </TokenWrapper>
                        <Flex flexDirection="column" alignItems="flex-end" style={{ width: '100%' }}>
                            <Flex flexDirection="column">
                                <Rating votes={votes} />
                                <Text color="secondary" bold textTransform="uppercase" textAlign="right">
                                    {title}
                                </Text>
                                <Flex>
                                    <Flex mr="10px">
                                        <BinanceIcon mr="5px" width="15px" />
                                        <Text color="warning" bold fontSize="1">
                                            {price?.bnb}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <CurrencyText bold fontSize="1" mr="5px">
                                            USD
                                        </CurrencyText>
                                        <CurrencyText bold fontSize="1">
                                            {price?.usd.toFixed(price.usd > 1 ? 2 : 4)}
                                        </CurrencyText>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex mt="20px" flexDirection="column">
                                <Text textAlign="right">{subtitle}</Text>
                                <Flex justifyContent="flex-end" mt="4">
                                    <Button variant="light" scale="xs" style={categoryBtnStyle}>
                                        {category}
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </FlexMobileContentWrapper>
                    <Flex justifyContent="flex-end" mt="20px" style={{ width: '100%' }}>
                        <ChainAddress chain={chain} />
                        <Button className="externalLinks" as="a" variant="secondary" href={cta} scale="sm">
                            Visit
                        </Button>
                    </Flex>
                    <Flex justifyContent="center" mt="18px" mb="10px" style={{ width: '100%' }}>
                        {!actionPanelOpen ? (
                            <ChevronDownIcon width={25} color="tertiary" />
                        ) : (
                            <ChevronUpIcon width={25} color="tertiary" />
                        )}
                    </Flex>
                </>
            )
        }

        return (
            <Flex style={{ width: '100%' }}>
                <TokenWrapper>
                    {/* {
                    imgLoading ? (
                        <Skeleton variant="circle" animation="waves" width={90} height={90} />
                    ) : renderAvatar()
                    } */}
                    {
                      renderAvatar()
                    }
                </TokenWrapper>
                <Flex justifyContent="space-between" style={{ width: '100%' }}>
                    <Flex flexDirection="column" style={{ width: '65%' }}>
                        <Flex alignItems="center">
                            <Text color="secondary" fontSize={isTablet ? '16px' : '12px'} bold textTransform="uppercase" mr="2">
                                {title}
                            </Text>
                            <Button variant="light" scale="xs" style={categoryBtnStyle}>
                                {category}
                            </Button>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text bold>{subtitle}</Text>
                        </Flex>
                        <Flex alignItems="center" justifyContent="space-between" mt="20px" ml="4px">
                            <Flex>
                                <ChainAddress chain={chain} />
                                <Button className="externalLinks" as="a" variant="secondary" href={cta} scale="sm">
                                    Visit
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex flexDirection="column" justifyContent="center">
                        <Rating votes={votes} />
                        <Flex flexDirection="column">
                            <Flex justifyContent="space-between">
                                <BinanceIcon mr="10px" />
                                <Text color="warning" bold textAlign="right">
                                    {price?.bnb}
                                </Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <CurrencyText bold>USD</CurrencyText>
                                <CurrencyText bold>{price?.usd.toFixed(price.usd > 1 ? 2 : 4)}</CurrencyText>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        )
    }

    return <Container>{renderContent()}</Container>
}

export default Game
