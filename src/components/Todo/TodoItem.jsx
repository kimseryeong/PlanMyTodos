import styled, { css } from 'styled-components';
import { MdCheck, MdDelete } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { todoState, loadingState } from '../../lib/atom'
import { onUpdateTodo, onDeleteTodo, onChangeCheck } from '../../API';

const Hover = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ced4da;
    font-size: 17px;
    

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
    padding: 12px;
    &:hover {
        border: 1px solid #efefef;
        border-radius: 16px;

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
    `}
`;
const Text = styled.div`
    flex: 1;
    font-size: 17px;
    color: #495057;
    ${props => props.done && css`
        color: #ced4da;
        text-decoration-line: line-through;
    `}
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

function TodoItem ({title, idx, done, uuid}) {
    const setTodoList = useSetRecoilState(todoState);
    // const userInfo = useRecoilValue(userState);
    // const uuid = userInfo ? userInfo.user.id : null;
    const [newTodo, setNewTodo] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const onModal = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const [loading, setLoading] = useRecoilState(loadingState);


    //수정
    const onUpdate = async () => {
        // console.log('onUpdate');
        setLoading(true);

        onClose();
        const data = await onUpdateTodo(uuid, idx, newTodo);

        setTodoList((prev) => prev.map(t => t.idx === data.idx ? data : t));
        setLoading(false);
    }

    //삭제
    const onDelete = async () => {
        setLoading(true);
        // console.log('onDelete');

        await onDeleteTodo(uuid, idx);
        setTodoList((prev) => prev.filter(t => t.idx !== idx));

        setLoading(false);
    }

    //완료체크
    const onCheck = async () => {
        // console.log('현재완료상태: ', done);
        setLoading(true);

        const data = await onChangeCheck(idx, !done);
        // console.log(data);
        setTodoList((prev)=> prev.map(t => t.idx === data.idx ? data : t));
        
        setLoading(false);
    }


    return (
        <TodoItemStyle>
            <CheckBlock done={done} onClick={onCheck}>{done && <MdCheck/>}</CheckBlock>
            <Text done={done}>{title}</Text>
            <Hover>
                <UpdateBlock onClick={onModal}><AiFillEdit/></UpdateBlock>
                <RemoveBlock onClick={onDelete}><MdDelete /></RemoveBlock>
            </Hover>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={style}
            >
                <ModalHead onClick={onClose} >
                    <span>할 일 수정</span>
                    <IoCloseOutline className='icon'/>
                </ModalHead>
                <ModalBody>
                    <Input autoFocus onChange={(e) => setNewTodo(e.target.value)} placeholder={title}/>
                    <button className='btns backColor' onClick={onUpdate}>수정</button>
                </ModalBody>
            </Modal>

            
        </TodoItemStyle>
    );
}

export default React.memo(TodoItem);