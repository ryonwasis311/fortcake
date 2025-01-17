import React, { createContext, useCallback, useState, ReactNode } from 'react'
import { kebabCase } from 'lodash'
import { Toast, toastTypes } from '../../components/Toast'
import { ToastContextApi } from './types'

const initialToastContext: ToastContextApi = {
    toasts: [],
    clear: () => { },
    remove: (id: string) => { },
    toastError: (title, description) => { },
    toastInfo: (title, description) => { },
    toastSuccess: (title, description) => { },
    toastWarning: (title, description) => { },
};
export const ToastsContext = createContext<ToastContextApi>(initialToastContext)

interface ToastsProviderProps {
    children: ReactNode
}

export const ToastsProvider: React.FC<ToastsProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastContextApi['toasts']>([])

    const toast = useCallback(
        ({ title, description, type }: Omit<Toast, 'id'>) => {
            setToasts((prevToasts) => {
                const id = kebabCase(title)

                // Remove any existing toasts with the same id
                const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

                return [
                    {
                        id,
                        title,
                        description,
                        type,
                    },
                    ...currentToasts,
                ]
            })
        },
        [setToasts],
    )

    const toastError = (title: Toast['title'], description?: Toast['description']) => {
        return toast({ title, description, type: toastTypes.DANGER })
    }
    const toastInfo = (title: Toast['title'], description?: Toast['description']) => {
        return toast({ title, description, type: toastTypes.INFO })
    }
    const toastSuccess = (title: Toast['title'], description?: Toast['description']) => {
        return toast({ title, description, type: toastTypes.SUCCESS })
    }
    const toastWarning = (title: Toast['title'], description?: Toast['description']) => {
        return toast({ title, description, type: toastTypes.WARNING })
    }
    const clear = () => setToasts([])
    const remove = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
    }

    return (
        <ToastsContext.Provider value={{ toasts, clear, remove, toastError, toastInfo, toastSuccess, toastWarning }}>
            {children}
        </ToastsContext.Provider>
    )
}
