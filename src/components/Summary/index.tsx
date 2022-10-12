import { Container } from "./styled"

import IncomerImg from "../../assets/income.svg"
import OutcomeImg from "../../assets/outcome.svg"
import TotalImg from "../../assets/total.svg"
import { useTransaction } from "../../hooks/TransctionContext"

export const Summary = () => {

    const { transactions } = useTransaction()

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposit += transaction.amount
            acc.total += transaction.amount
        } else if (transaction.type === 'withdraw') {
            acc.withdraw += transaction.amount
            acc.total -= transaction.amount
        }

        // acc.total = acc.deposit - acc.withdraw
        return acc
    }, {
        deposit: 0,
        withdraw: 0,
        total: 0
    })




    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomerImg} alt="Entradas" />
                </header>
                <strong>{
                    new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.deposit)
                }</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={OutcomeImg} alt="Saidas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(summary.withdraw)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(summary.total)}</strong>
            </div>
        </Container>
    )
}