import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dateState, todoState, loadingState } from '../../lib/atom';
import CmButton from '../Common/CmButton';
import { CmScrollStyle } from '../Common/CmScrollStyle'
import { cmFetchPost } from '../../api/common';
import { CmModal } from '../Common/CmModal';
import { toast } from 'react-hot-toast';

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
    border: 1px solid #faedcd;
`;

const Buttons = styled.div`
    margin: 0;
    margin-left: auto;
    display: flex;
    justify-content: right;
`;

const Textarea = styled.textarea`
    padding: 8px;
    width: 100%;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #faedcd;
    height: 100px;

    ${CmScrollStyle}
`;

export const TodoUpdateModal = ({ isOpen, onRequestClose, head, id, title, content, done, startAt, endAt, email }) => {

    const setTodoList = useSetRecoilState(todoState);
    const date = useRecoilValue(dateState);
    const setLoading = useSetRecoilState(loadingState);

    const [newTodoTitle, setNewTodoTitle] = useState(title);
    const [newTodoContent, setNewTodoContent] = useState(content);

    useEffect(() => {
        setNewTodoTitle(title);
        setNewTodoContent(content);
    }, [title, content])


    const onUpdate = async () => {
        setLoading(true);

        onRequestClose();
        try{
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/updateTodo';
            const fetchParams = {
                id: id,
                email: email,
                title: newTodoTitle,
                content: newTodoContent,
                startAt: startAt,
                endAt: endAt
            }
    
            const data = await cmFetchPost(fetchUrl, fetchParams);
    
            setTodoList((prev) => prev.map(t => t.id === data.id ? data : t));

        }
        catch(error){
            toast.error("Failed to update todo");
        }

        
        setLoading(false);
    }

    return (
        <>
            <CmModal title={head} isOpen={isOpen} onRequestClose={onRequestClose}>
                <Wrap>
                    <Input autoFocus onChange={(e) => setNewTodoTitle(e.target.value)} 
                        placeholder="Title" defaultValue={title}/>
                </Wrap>
                <Wrap>
                    <Textarea onChange={(e) => setNewTodoContent(e.target.value)} 
                        placeholder="Detail" defaultValue={content}
                        />
                </Wrap>
                <Buttons>
                    <CmButton action={onUpdate} name={'Save'} backColor={true}></CmButton>
                </Buttons>
            </CmModal>
        </>
    )
}