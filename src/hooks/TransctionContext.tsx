import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


type TransactionProviderProps = {
    children: ReactNode
}

type TransactionType = {
    id: number
    title: string
    amount: number
    category: string
    type: string
    createdAt: string
}

type TransactionInputType = Omit<TransactionType, 'id' | 'createdAt'>;

type TransactionContextType = {
    transactions: Array<TransactionType>,
    createTransaction: (data: TransactionInputType) => Promise<void>
}

const TransactionContext = createContext({} as TransactionContextType);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<Array<TransactionType>>([])


    useEffect(() => {
        api.get('transactions')
            .then(res => {
                setTransactions(res.data.transactions);
            })
    }, [])

    const createTransaction = async (transactionInput: TransactionInputType) => {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })

        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionContext.Provider value={{
            transactions,
            createTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction = () => useContext(TransactionContext)