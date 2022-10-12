

import { FC, useEffect, useState } from 'react'
import { useTransaction } from '../../hooks/TransctionContext'
import { api } from '../../services/api'
import { Container } from './styled'


type TransactionType = {
    id: number
    title: string
    amount: number
    category: string
    type: string
    createdAt: string
}

const TransactionTable: FC = () => {
    const { transactions } = useTransaction()

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((el) => (
                        <tr key={el.id}>
                            <td className='title'>{el?.title}</td>
                            <td className={el?.type}>{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(el?.amount)}</td>
                            <td>{el?.category}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(el?.createdAt))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default TransactionTable