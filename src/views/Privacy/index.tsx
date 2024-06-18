/* eslint-disable */
import React from 'react'
import { Heading, Text, Flex, useMatchBreakpoints } from 'fortcake-uikit-v2'
import Page from '../../components/Layout/Page'
import { LandingText, ControlContainer, LabelWrapper, FilterContainer, StyledImage } from './styles'

const Privacy: React.FC = () => {
    const { isMobile } = useMatchBreakpoints()

    return (
        <Page>
            <ControlContainer>
                <FilterContainer>
                    <LabelWrapper>
                        <Text textTransform="uppercase">Privacy Policy</Text>
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
                            Fortcake.io is a cryptocurrency and DEX platform specializing in meme coins, offering competitive swap fees on the Binance Smart Chain. This Privacy Policy outlines our practices regarding the collection, use, and protection of your information.
                        </Text>
                    </div>
                </Flex>
                <Text as="p" override>
                    Last modified: 04/03/2024
                </Text>
                <br />
                <Text as="p" override>
                    Privacy Policy
                </Text>
                <Text>
                    "FORTCAKE.IO" is committed to lawful, fair, and transparent collection of your data. This policy governs data collection by us and our affiliates (collectively “FORTCAKE.IO”) when you use our products, services and website (collectively the “Services”). It was drafted to help you understand the types of information we collect from you, how we use it, as well as how we share, store and protect it. <br /><br />
                    If you do not agree with this policy, you should not use our Services. By accessing or using our Services, you agree to this policy, which may change from time to time to better reflect our practices and applicable laws. Your continued use after we make change(s) is deemed acceptance of those changes.
                </Text>
                <br />
                <Text as="p" override>
                    Types of Information We Collect
                </Text>
                <Text>
                    We collect information if you voluntarily provide it to us. For example, if you sign up for our Services, you might give us your name and email address. You might also give us data when you email us or give us feedback. In addition, you may submit information online through surveys, forms, portals, or other interactive activities on our website. details about transactions you carry out through our website. It is always your choice whether or not to provide personal data. Do not provide personal data unless you are authorized to do so.<br /><br />
                    We may collect the following information directly from you:<br />
                    - Information that may be personally identified, such as name, address, e-mail address, and other identifier by which you may be contacted online or offline ("personal information"); <br />
                    - Information that is about you but individually does not identify you; and/or<br />
                    - Information about how you interact with our website, such as internet connection or the equipment you use to access the Services.<br /><br />
                    This policy does not apply to third-party sites that may link to, or be accessible from, our site. We do not control these third parties' tracking technologies or how they may be used. Your interactions with these sites are governed by the third parties’ applicable privacy statements. If you have any questions about these sites, you should contact the responsible provider directly.
                </Text>
                <br />
                <Text as="p" override>
                    How We Use Your Information
                </Text>
                <Text>
                    We use information that we collect about you or that you provide to us, including personal information to present our Services to you; to provide you with information, products, or services that you request from us; to fulfill any other purpose for which you provide it; to provide you with notices about our platform; to carry out our obligations; to comply with legal obligations; or for any other purpose with your consent.<br /><br />
                    If you are an EU resident, we will collect and use your personal data only if we have one or more legal bases for doing so under the GDPR. This means we collect and use your personal data only where you have given your consent for one or more specific purposes; it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests; it is necessary to protect the vital interests of you or another natural person; or it is necessary to comply with a legal obligation. 
                </Text>
                <br />
                <Text as="p" override>
                    Who We Share Your Information With
                </Text>
                <Text>
                    We may disclose aggregated information about our users, and information that does not identify any individual, without restriction.<br /><br />
                    We may disclose personal information that we collect or you provide as described in this policy: to our team members, agents, subsidiaries and affiliates who have a business need to know; to contractors, service providers, and other third parties we use to support our business; to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of the Company’s assets; to fulfill the purpose for which you provide it; for any other purpose disclosed by us when you provide the information; and/or with your consent.<br /><br />
                    We may also disclose your personal information: to comply with any court order, law, or legal process, including to respond to any government or regulatory request; and/or to enforce or apply our terms of use and other agreements, including for billing and collection purposes.<br /><br />
                    If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.
                </Text>
                <br />
                <Text as="p" override>
                    How We Protect Your Personal Information
                </Text>
                <Text>
                    We may store your personal data in any region or in any country where we or our service providers have facilities. We implement reasonable processes and adhere to best practices in order to protect your Personal Information from accidental loss and from unauthorized access, use, alteration, and disclosure. Unfortunately, the transmission of information via the internet is not completely secure. We will do our best to protect your personal information, but we cannot guarantee the security of your personal information transmitted to our website. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the website. We will store your personal data only until it is no longer needed to fulfill the purpose(s) for which it was collected or as required or permitted by law; at that point it will be anonymized, deleted, or isolated.
                </Text>
                <br />
                <Text as="p" override>
                    Accessing and Correcting Your Information
                </Text>
                <Text>
                    You can request to access, correct or delete any personal information that you have provided to us by contacting us at contact @ FORTCAKE.IO. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect.
                </Text>
                <Text as="p" override>
                    Changes to Privacy Policy
                </Text>
                <Text>
                    Updates to our Privacy Policy will be posted directly on the policy page.
                </Text>
            </LandingText>
        </Page>
    )
}

export default Privacy
