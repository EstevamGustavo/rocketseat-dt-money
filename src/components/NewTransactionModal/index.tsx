import { FC, FormEvent, useState } from "react";
import Modal from 'react-modal'
import CloseImg from '../../assets/close.svg'
import Incomeimg from '../../assets/income.svg'
import Outcomeimg from '../../assets/outcome.svg'
import { useTransaction } from "../../hooks/TransctionContext";
import { api } from "../../services/api";
import { Container, RadioBox, TransactionTypeContainer } from "./styled";

type NewModalTransactionProps = {
    isOpen: boolean
    onRequestClose: () => void
}

Modal.setAppElement('#root')

export const NewTransactionModal: FC<NewModalTransactionProps> = ({ isOpen, onRequestClose }) => {
    const { createTransaction } = useTransaction()
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')


    const handleCreateNewTrasaction = async (event: FormEvent) => {
        event.preventDefault();

        console.log({
            title,
            amount,
            category,
            type
        });


        await createTransaction({
            title,
            amount,
            category,
            type
        })

        onRequestClose()
        // setTitle('');
        // setAmount(0)
        // setType('deposit')
        // setCategory('')

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className='react-modal-content'
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={CloseImg} alt="close" />
            </button>
            <Container onSubmit={handleCreateNewTrasaction}>
                <h2>Aberto</h2>

                <input
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    placeholder="Valor"
                    type="number"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={Incomeimg} />
                        <span >
                            Entrada
                        </span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={Outcomeimg} />
                        <span >
                            Saida
                        </span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit" >Cadastrar</button>

            </Container>

        </Modal>
    )

}