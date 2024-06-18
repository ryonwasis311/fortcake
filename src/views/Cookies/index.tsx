/* eslint-disable */
import React from 'react'
import { Heading, Text, Flex, useMatchBreakpoints } from 'fortcake-uikit-v2'
import Page from '../../components/Layout/Page'
import { LandingText, ControlContainer, LabelWrapper, FilterContainer, StyledImage } from './styles'

const Cookies: React.FC = () => {
    const { isMobile } = useMatchBreakpoints()

    return (
        <Page>
            <ControlContainer>
                <FilterContainer>
                    <LabelWrapper>
                        <Text textTransform="uppercase">Cookie Policy</Text>
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
                            Fortcake.io uses cookies and similar technologies to improve user experience and website functionality.
                        </Text>
                    </div>
                </Flex>
                <Text as="p" override>
                    <strong>Cookie Policy</strong><br />
                    Last Modified: 04/03/2024<br /><br />
                    At Fortcake.io, we are dedicated to enhancing user experience and optimizing website functionality. Our Cookie Policy outlines the use of cookies and similar technologies on our platform.<br /><br />
                    <strong>Purpose of Cookies</strong><br /><br />
                    Cookies play a vital role in improving user experience and website functionality. These small text files are stored on your device when you visit our website. They help us recognize your device, remember your preferences, and personalize your experience. Cookies also enable us to analyze how users interact with our website, allowing us to make necessary improvements and optimizations.<br /><br />
                    We utilize different types of cookies for various purposes:<br />
                    1. <strong>Essential Cookies</strong>: These cookies are necessary for the operation of our website. They enable you to navigate the site and use essential features such as accessing secure areas.<br />
                    2. <strong>Analytical/Performance Cookies</strong>: These cookies collect information about how visitors use our website, such as which pages are visited most frequently and if users encounter any errors. This data helps us understand and improve the performance of our site.<br />
                    3. <strong>Functionality Cookies</strong>: Functionality cookies allow our website to remember choices you make (such as language preferences) and provide enhanced, more personalized features.<br /><br />
                    <strong>Managing Cookies</strong><br /><br />
                    You have the option to manage or opt out of cookies through your browser settings. Most web browsers allow you to control cookies through their settings preferences. You can choose to accept, reject, or delete cookies. However, please note that disabling cookies may impact certain features and functionality of our website.<br /><br />
                    By continuing to use our website, you consent to the use of cookies in accordance with this Cookie Policy. If you have any questions or concerns regarding our use of cookies, please contact us at [contact @ fortcake.io].<br /><br />
                    <strong>Updates to Cookie Policy</strong><br /><br />
                    We may update this Cookie Policy from time to time to reflect changes in our practices and legal requirements. Any updates will be posted directly on this page, and your continued use of our website signifies your acceptance of these changes.<br /><br />
                    Thank you for choosing Fortcake.io. We are committed to providing you with a seamless and personalized user experience.
                </Text>
            </LandingText>
        </Page>
    )
}

export default Cookies
