import React, { useState } from 'react';
import Modal from 'react-modal';
import styled, { css } from 'styled-components';
import { MdAdd, MdCancel } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { onCreateTodo,useUserUuid } from '../../API';
import { supabase } from '../../lib/supabaseClient';
import { userState, dateState, todoState, errorState } from '../../lib/atom';
import Loading from '../../Loading';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const CreateItem = styled.div`
    // border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 10px;
    color: #7FB3D5;
    &:hover{
        cursor: pointer;
        font-weight: 700;
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
        ,zIndex: 1000
    }
}

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

export default function TodoCreate(){
    const uuid = useUserUuid();
    const date = useRecoilValue(dateState);
    const setTodoList = useSetRecoilState(todoState);
    const setError = useSetRecoilState(errorState);
    const [loading, setLoading] = useState(false);
    
    const [todo, setTodo] = useState(''); //사용자 입력 todo
    
    const [isOpen, setIsOpen] = useState(false);
    const onModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onCreate = async () => {
        setLoading(true);
        
        // console.log('onCreate');
        
        closeModal();
        
        const data = await onCreateTodo(uuid, date, todo, setError);
        setTodoList((prev) => [...prev, data]);

        setLoading(false);
        
    }

    return (
        <>
            {uuid ? 
            <CreateItem onClick={onModal} ><MdAdd />할 일 추가</CreateItem> 
            : <div>로그인 후 이용 가능합니다.</div>
            }
            {loading && <Loading loading={loading}/>}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={style}
            >
                <ModalHead onClick={closeModal} >
                    <span>할 일 추가</span>
                    <IoCloseOutline className='icon'/>
                </ModalHead>
                <ModalBody>
                    <Input autoFocus onChange={(e) => setTodo(e.target.value)}/>
                    <button className='btns backColor' onClick={onCreate}>등록</button>
                </ModalBody>
            </Modal>
        
        </>
    );
}