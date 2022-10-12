import { FC } from 'react'
import Logo from '../../assets/logo.svg'
import { Container, Content } from './styled'
import Modal from 'react-modal'

type HeaderProps = {
    onHandleOpenNewTransactionModal: () => void
}

export const Header: FC<HeaderProps> = ({ onHandleOpenNewTransactionModal }) => {


    return (
        <Container>
            <Content>
                <img src={Logo} alt="dt money" />
                <button type="button" onClick={onHandleOpenNewTransactionModal}>
                    Nova Transação
                </button>

            </Content>
        </Container>
    )
}