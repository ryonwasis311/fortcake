import React from 'react'
import styled from 'styled-components'
import { Box } from 'fortcake-uikit-v2'
import Container from '../Layout/Container'
import { PageHeaderProps } from './types'

const Outer = styled(Box) <{ background?: string }>`
  background: ${({ theme, background }) => background || theme.colors.gradients.inverseBubblegum};
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`

const PageHeader: React.FC<PageHeaderProps> = ({ background, children, ...props }) => (
    <Outer background={background} {...props}>
        <Inner>{children}</Inner>
    </Outer>
)

export default PageHeader
