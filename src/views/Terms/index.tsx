/* eslint-disable */
import React from 'react'
import { Heading, Text, Flex, useMatchBreakpoints } from 'fortcake-uikit-v2'
import Page from '../../components/Layout/Page'
import { LandingText, ControlContainer, LabelWrapper, FilterContainer, StyledImage } from './styles'

const Terms: React.FC = () => {
    const { isMobile } = useMatchBreakpoints()

    return (
        <Page>
            <ControlContainer>
                <FilterContainer>
                    <LabelWrapper>
                        <Text textTransform="uppercase">Terms of Service</Text>
                    </LabelWrapper>
                </FilterContainer>
            </ControlContainer>
            <LandingText>
                <Flex alignItems="center" justifyContent="space-between" mb={isMobile ? '30px' : '20px'}>
                    <div>
                        <Heading as="h3" scale="lg" color="secondary" mt="42px">
                            Introduction
                        </Heading>
                        <Text>
                            Fortcake.io offers a cryptocurrency and DEX platform for meme coins. This document outlines our Terms of Service.
                        </Text>
                    </div>
                </Flex>
                <br /><br />
                <Text as="p">
                    This website does not constitute an offer to purchase or solicitation to sell, nor is it a recommendation to buy or sell, any token or other product. Purchasing and selling tokens is inherently risky and holders must bear their risk of loss. Neither the authors of this website nor any participants in the FORTCAKE project accept any liability for losses or taxes that holders, purchasers or sellers of FORTCAKE may incur. The value of FORTCAKE may decrease and may be highly volatile.
                </Text>
                <br /><br />
                <Text as="p">
                    This website is not directed towards any person located in a jurisdiction where purchasing, selling or holding FORTCAKE is prohibited or regulated. Consult your local laws before transacting in any cryptocurrency.
                </Text>
                <br /><br />
                <Text as="p" fontWeight="bold">
                    PLEASE READ THE ENTIRETY OF THIS "LEGAL DISCLAIMER" SECTION CAREFULLY.
                </Text>
                <br /><br />
                <Text as="p">
                    NOTHING HEREIN CONSTITUTES LEGAL, FINANCIAL, BUSINESS OR TAX ADVICE AND YOU SHOULD CONSULT YOUR OWN LEGAL, FINANCIAL, TAX OR OTHER PROFESSIONAL ADVISOR(S) BEFORE ENGAGING IN ANY ACTIVITY IN CONNECTION HEREWITH. NEITHER FORTCAKE (THE COMPANY), ANY OF THE PROJECT TEAM MEMBERS (THE FORTCAKE TEAM) WHO HAVE WORKED ON FORTCAKE (AS DEFINED HEREIN) OR PROJECT TO DEVELOP FORTCAKE IN ANY WAY WHATSOEVER, ANY DISTRIBUTOR/VENDOR OF $FORTCAKE TOKENS (THE DISTRIBUTOR), NOR ANY SERVICE PROVIDER SHALL BE LIABLE FOR ANY KIND OF DIRECT OR INDIRECT DAMAGE OR LOSS WHATSOEVER WHICH YOU MAY SUFFER IN CONNECTION WITH ACCESSING THIS WHITEPAPER, THE WEBSITE AT HTTPS://WWW.FORTCAKE.IO/ (THE WEBSITE) OR ANY OTHER WEBSITES OR MATERIALS PUBLISHED BY THE COMPANY.
                </Text>
                <br /><br />
                <Text as="p">
                    Project purpose: You agree that you are acquiring $FORTCAKE to participate in FORTCAKE and to obtain services on the ecosystem thereon. The Company, the Distributor and their respective affiliates would develop and contribute to the underlying source code for FORTCAKE. The Company is acting solely as an arms’ length third party in relation to the $FORTCAKE distribution, and not in the capacity as a financial advisor or fiduciary of any person with regard to the distribution of $FORTCAKE.
                </Text>
                <br /><br />
                <Text as="p">
                    Nature of the Whitepaper: The Whitepaper and the Website are intended for general informational purposes only and do not constitute a prospectus, an offer document, an offer of securities, a solicitation for investment, or any offer to sell any product, item, or asset (whether digital or otherwise). The information herein may not be exhaustive and does not imply any element of a contractual relationship. There is no assurance as to the accuracy or completeness of such information and no representation, warranty or undertaking is or purported to be provided as to the accuracy or completeness of such information. Where the Whitepaper or the Website includes information that has been obtained from third party sources, the Company, the Distributor, their respective affiliates and/or the FORTCAKE team have not independently verified the accuracy or completeness of such information. Further, you acknowledge that circumstances may change and that the Whitepaper or the Website may become outdated as a result; and neither the Company nor the Distributor is under any obligation to update or correct this document in connection therewith.
                </Text>
                <br /><br />
                <Text as="p">
                    Token Documentation: Nothing in the Whitepaper or the Website constitutes any offer by the Company, the Distributor, or the FORTCAKE team to sell any $FORTCAKE (as defined herein) nor shall it or any part of it nor the fact of its presentation form the basis of, or be relied upon in connection with, any contract or investment decision. Nothing contained in the Whitepaper or the Website is or may be relied upon as a promise, representation or undertaking as to the future performance of FORTCAKE. The agreement between the Distributor (or any third party) and you, in relation to any distribution or transfer of $FORTCAKE, is to be governed only by the separate terms and conditions of such agreement.
                </Text>
                <br /><br />
                <Text as="p" override>
                    The information set out in the Whitepaper and the Website is for community discussion only and is not legally binding. No person is bound to enter into any contract or binding legal commitment in relation to the acquisition of $FORTCAKE, and no digital asset or other form of payment is to be accepted on the basis of the Whitepaper or the Website. The agreement for distribution of $FORTCAKE and/or continued holding of $FORTCAKE shall be governed by a separate set of Terms and Conditions or Token Distribution Agreement (as the case may be) setting out the terms of such distribution and/or continued holding of $FORTCAKE (the Terms and Conditions), which shall be separately provided to you or made available on the Website. The Terms and Conditions must be read together with the Whitepaper. In the event of any inconsistencies between the Terms and Conditions and the Whitepaper or the Website, the Terms and Conditions shall prevail.
                </Text>
                <br /><br />
                <Text as="p">
                    Contact Information
                </Text>
                <br /><br />
                <Text>
                    Contact details are provided for users to address concerns related to the Terms of Service. Contact via DM feature on twitter.com/fortcake for official contact.
                </Text>
            </LandingText>
        </Page>
    )
}

export default Terms
