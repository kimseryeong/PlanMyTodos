import styled, { css } from 'styled-components';
import { MdCheck, MdDelete } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { supabase } from '../../lib/supabaseClient';
import Modal from 'react-modal';
import { useState } from 'react';

const Hover = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ced4da;
    font-size: 20px;

`;
const RemoveBlock = styled.button`
    &:hover{
        color: #ff6b6b;
    }
    color: #ced4da;
    display: none;
    border: none;
    background: transparent;
`;
const UpdateBlock = styled.div`
    &:hover{
        color: #7FB3D5;
    }
    margin-right: 10px;
    display: none;
`;
const TodoItemStyle = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${RemoveBlock} {
            display: initial;
        }
        ${UpdateBlock} {
            display: initial;
        }
    }
`;


const CheckBlock = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 16px;
    border: 1px solid #ddd;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props => props.done && css`
        border: 1px solid #7FB3D5;
        color: #7FB3D5;
        text-decoration: line-line-through;
    `}
`;
const Text = styled.div`
    flex: 1;
    font-size: 20px;
    color: #495057;
    ${props => props.done && css`color: #ced4da;`}
`;
const ModalHead = styled.div`
    display: flex;
    align-items: center;
    .icon{
        margin-left: auto; 
        cursor: pointer;
    }
    span{
        margin-right: auto;
        font-weight: 700;
    }
`;
const ModalBody = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button{
        margin-top: 20px;
    }
`;
const Input = styled.input`
  padding: 12px;
  width: 100%;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #ddd;
`;

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '200px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
    }
}

export default function TodoItem ({done, title, idx}) {
    
    const completeState = done === 'N' ? false : true;

    const onDelete = async (e) => {
        console.log(idx);

        const { error } = await supabase
            .from('todolist')
            .delete()
            .eq('idx', idx)

        if(error) console.log(error);
    }

    const [isOpen, setIsOpen] = useState(false);

    const onUpdateModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [todo, setTodo] = useState(title);

    const onUpdate = async () => {
        console.log(todo);

        const { data, error } = await supabase
            .from('todolist')
            .update({ title: todo })
            .eq('idx', idx)
            .select()

        if(error) console.log(error); 
        closeModal(); 

    }
    return (
        <TodoItemStyle>
            <CheckBlock done={completeState}>{completeState && <MdCheck/>}</CheckBlock>
            <Text done={completeState}>{title}</Text>
            <Hover>
                <UpdateBlock onClick={onUpdateModal}><AiFillEdit/></UpdateBlock>
                <RemoveBlock onClick={onDelete}><MdDelete /></RemoveBlock>
            </Hover>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={style}
            >
                <ModalHead onClick={closeModal} >
                    <span>할 일 수정</span>
                    <IoCloseOutline className='icon'/>
                </ModalHead>
                <ModalBody>
                    <Input autoFocus onChange={(e) => setTodo(e.target.value)} placeholder={title}/>
                    <button className='btns backColor' onClick={onUpdate}>수정</button>
                </ModalBody>
            </Modal>
        </TodoItemStyle>
    );
}