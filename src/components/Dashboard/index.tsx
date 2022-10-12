import { Summary } from "../Summary"
import TransactionTable from "../TransactionTable"
import { Container } from "./styled"

export const Dashboard = () => {

    return (
        <Container>
            <Summary />
            <TransactionTable />
        </Container>
    )
}