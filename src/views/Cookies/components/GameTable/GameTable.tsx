import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType } from 'fortcake-uikit-v2'
import { useTranslation } from '../../../../contexts/Localization'

import Row, { RowProps } from './Row'

export interface ITableProps {
    data: RowProps[]
    columns: ColumnType<RowProps>[]
    userDataReady: boolean
    sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;
  scroll-margin-top: 64px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0 24px;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const GameTable: React.FC<ITableProps> = (props) => {
    const tableWrapperEl = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const { data, columns } = props

    const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'game' })

    const scrollToTop = (): void => {
        if (tableWrapperEl.current)
            tableWrapperEl.current.scrollIntoView({
                behavior: 'smooth',
            })
    }

    const closePanelEvent = new Event('closePanel')

    return (
        <Container id="farms-table">
            <TableContainer>
                <TableWrapper ref={tableWrapperEl}>
                    <StyledTable>
                        <TableBody>
                            {rows.map((row) => {
                                return <Row {...row.original} key={`table-row-${row.id}`} closePanelEvent={closePanelEvent} />
                            })}
                        </TableBody>
                    </StyledTable>
                </TableWrapper>
                <ScrollButtonContainer>
                    <Button variant="text" onClick={scrollToTop}>
                        {t('To Top')}
                        <ChevronUpIcon color="primary" />
                    </Button>
                </ScrollButtonContainer>
            </TableContainer>
        </Container>
    )
}

export default GameTable
