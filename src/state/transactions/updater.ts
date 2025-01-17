import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../contexts/Localization'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useBlock } from '../../state/block/hooks'
import { ToastDescriptionWithTx } from '../../components/Toast'
import useToast from '../../hooks/useToast'
import { AppDispatch, AppState } from '../index'
import { checkedTransaction, finalizeTransaction } from './actions'

export function shouldCheck(
    currentBlock: number,
    tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number },
): boolean {
    if (tx.receipt) return false
    if (!tx.lastCheckedBlockNumber) return true
    const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber
    if (blocksSinceCheck < 1) return false
    const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9
    }
    if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2
    }
    // otherwise every block
    return true
}

export default function Updater(): null {
    const { provider, chainId } = useActiveWeb3React()
    const { t } = useTranslation()

    const { currentBlock } = useBlock()

    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)

    const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

    const { toastError, toastSuccess } = useToast()

    useEffect(() => {
        if (!chainId || !provider || !currentBlock) return

        Object.keys(transactions)
            .filter((hash) => shouldCheck(currentBlock, transactions[hash]))
            .forEach((hash) => {
                provider
                    .getTransactionReceipt(hash)
                    .then((receipt) => {
                        if (receipt) {
                            dispatch(
                                finalizeTransaction({
                                    chainId,
                                    hash,
                                    receipt: {
                                        blockHash: receipt.blockHash,
                                        blockNumber: receipt.blockNumber,
                                        contractAddress: receipt.contractAddress,
                                        from: receipt.from,
                                        status: receipt.status,
                                        to: receipt.to,
                                        transactionHash: receipt.transactionHash,
                                        transactionIndex: receipt.transactionIndex,
                                    },
                                }),
                            )

                            const toast = receipt.status === 1 ? toastSuccess : toastError
                            console.log("TODO - 5");
                            // toast(t('Transaction receipt'), <ToastDescriptionWithTx txHash={ receipt.transactionHash as string } />)
                        } else {
                            dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }))
                        }
                    })
                    .catch((error) => {
                        console.error(`failed to check transaction hash: ${hash}`, error)
                    })
            })
    }, [chainId, provider, transactions, currentBlock, dispatch, toastSuccess, toastError, t])

    return null
}
