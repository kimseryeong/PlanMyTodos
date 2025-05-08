import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dateState, todoState, errorState } from '../../lib/atom';
import CmButton from '../Common/CmButton';
import { CmScrollStyle } from '../Common/CmScrollStyle'
import { cmFetchPost } from '../../api/common';
import { CmModal } from '../Common/CmModal';


const Wrap = styled.div`
    display:flex;
    width: 100%;
    align-items: start;
    justify-content: center;
    margin: 5px 0;

    div{
        text-align: left;
        margin-top: 5px;
        width: 50px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: inset 0 -10px #fbea9d;
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

const Buttons = styled.div`
    margin-top: 10px;
`;

const Textarea = styled.textarea`
    padding: 8px;
    width: 100%;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    height: 100px;

    ${CmScrollStyle}
`;

export const TodoModal = ({ title, email, isOpen, onRequestClose}) => {

    const setTodoList = useSetRecoilState(todoState);
    const date = useRecoilValue(dateState);
    const [todoTitle, setTodoTitle] = useState(''); //사용자 입력 todo title
    const [todoContent, setTodoContent] = useState(''); //사용자 입력 todo content
    
    const [loading, setLoading] = useState(false);

    const onCreate = async () => {
        
        setLoading(true);
        
        onRequestClose();
        
        try{
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/createTodo';
            const fetchParams = {
                email: email,
                title: todoTitle,
                content: todoContent, 
                startAt: date,
                endAt: date,
            }
            const data = await cmFetchPost(fetchUrl, fetchParams);
            
            setTodoList((prev) => [data, ...prev]);
        }
        catch(error){
            console.error(error);
        }
        
        setLoading(false);
        
    }

    return (
        <>
            <CmModal title={title} isOpen={isOpen} onRequestClose={onRequestClose}>
                <Wrap>
                    <Input autoFocus onChange={(e) => setTodoTitle(e.target.value)} 
                        placeholder="Title"/>
                </Wrap>
                <Wrap>
                    <Textarea onChange={(e) => setTodoContent(e.target.value)} 
                        placeholder="Detail"/>
                </Wrap>
                <Buttons>
                    <CmButton action={onCreate} name={'Add'} backColor={true}></CmButton>
                </Buttons>
            </CmModal>
        </>
    )
}