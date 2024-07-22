import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { MdAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { dateState, todoState, errorState, userUuid } from '../../lib/atom';
import Loading from '../../Loading';
import CmButton from '../Common/CmButton';

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '40vw'
        ,height: '300px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 1000
        ,fontFamily: 'pretendard'
    }
}

const CreateItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    color: #7FB3D5;
    margin-top: 15px;
    font-weight: 500;

    &:hover{
        cursor: pointer;
        font-weight: 800;
    }
`;

const Input = styled.input`
    height: 40px;
    width: 100%;
    padding: 8px;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
    padding: 8px;
    width: 100%;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    height: 100px;

    &::-webkit-scrollbar{
        width: 8px;
        background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
        background: #A9CCE3;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-thumb:hover{
        cursor: pointer;
    }
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
`;

const Wrap = styled.div`
    display:flex;
    width: 100%;
    align-items: start;
    justify-content: center;
    margin: 5px 0;

    div{
        width: 50px;
        font-size: 14px;
        font-weight: 500;
    }
`;


const Buttons = styled.div`
    margin-top: 10px;
`;

export default function TodoCreate(){
    const uuid = useRecoilValue(userUuid);
    const date = useRecoilValue(dateState);
    const setTodoList = useSetRecoilState(todoState);
    const [loading, setLoading] = useState(false);
    
    const [todoTitle, setTodoTitle] = useState(''); //사용자 입력 todo title
    const [todoContent, setTodoContent] = useState(''); //사용자 입력 todo content
    
    const [isOpen, setIsOpen] = useState(false);
    const onModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onCreate = async () => {
        
        setLoading(true);
        
        closeModal();
        
        const {data, error} = await supabase
            .from('todolist')
            .insert([
                {
                    id: uuid, 
                    title: todoTitle, 
                    content: todoContent, 
                    start_date: date,
                    complete_state: 'N', 
                }
            ])
            .select('idx, title, content, complete_state, start_date')
        
        if(error) console.log('onCreateTodo 데이터 삽입 중 에러 발생 !!! ');

        setTodoList((prev) => [data[0], ...prev]);

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
                    <IoCloseOutline className='icon' size='25'/>
                </ModalHead>
                <ModalBody>
                    <Wrap>
                        <div>제목</div>
                        <Input autoFocus onChange={(e) => setTodoTitle(e.target.value)} />
                    </Wrap>
                    <Wrap>
                        <div>내용</div>
                        <Textarea onChange={(e) => setTodoContent(e.target.value)} />
                    </Wrap>
                </ModalBody>
                <Buttons>
                    <CmButton action={onCreate} name={'등록'} backColor={true}></CmButton>
                </Buttons>
            </Modal>
        
        </>
    );
}