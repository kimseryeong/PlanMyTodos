import styled, { css } from 'styled-components';
import { MdCheck, MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';

import { CmScrollStyle } from '../Common/CmScrollStyle';
import { todoState, loadingState, dateState } from '../../lib/atom'
import { cmFetchPost } from '../../api/common';
import { useSession } from '../SessionProvider';
import toast from 'react-hot-toast';
import { TodoUpdateModal } from '../Todo/TodoUpdateModal'
import { LoginModal } from '../LoginModal';

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
        color: #ef476f;
    }
    color: #ced4da;
    display: none;
    border: none;
    background: transparent;
`;
const UpdateBlock = styled.div`
    &:hover{
        color: ${({theme}) => theme.colors.primary};
    }
    margin-right: 10px;
    display: none;
`;
const TodoItemStyle = styled.div`
    margin: 5px 0;
    padding: 12px;
    background-color: ${({theme}) => theme.colors.back};
    border-radius: 16px;


    &:hover {
        border: 1px solid #fbea9d;

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
        border: 1px solid ${({theme}) => theme.colors.primary};
        color: ${({theme}) => theme.colors.primary};
    `}
`;
const Text = styled.div`
    flex: 1;
    font-size: 16px;
    color: #495057;
    display: flex;
    flex-direction: column;

    ${props => props.done && css`
        color: #ced4da;
        text-decoration-line: line-through;
    `}

    span{
        font-size: 13px;
        color: #8c8c8c;
    }
`;

const ItemHead = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
`;

const Content = styled.div`
    color: grey;
    margin-left: 45px;
    
    pre{
        font-family: 'pretendard';
        font-size: 13.5px;
        white-space: pre-wrap;
    }

    ${props => props.done && css`
        color: #ced4da;
        text-decoration-line: line-through;
    `}
`;


const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '40vw'
        ,minHeight: 'fit-content'
        ,maxHeight: 'fit-content'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
        ,fontFamily: 'pretendard'
    }
}

function TodoItem ({id, title, content, done, startAt, endAt, email}) {
    const { session } = useSession();

    const date = useRecoilValue(dateState);
    const setTodoList = useSetRecoilState(todoState);

    const setLoading = useSetRecoilState(loadingState);

    const [ showLoginModal, setShowLoginModal ] = useState(false);
    const [ showUpdateModal, setShowUpdateModal ] = useState(false);

    const clickUpdate = () => {
        if(!session){
            toast.error('Please login to continue!');
            setShowLoginModal(true);
        }
        else{
            setShowUpdateModal(true);
        }
    }


    //삭제
    const onDelete = async () => {
        if(!session){
            toast.error('Please login to continue!');
            setShowLoginModal(true);
            return;
        }

        setLoading(true);

        try{
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/deleteTodo';
            const fetchParams = {
                id: id,
                email: email,
                currentAt: date
            }
    
            const data = await cmFetchPost(fetchUrl, fetchParams);
    
            setTodoList(data);

        }
        catch(error){
            toast.error("Failed to delete todo");
        }


        setLoading(false);
    }

    //완료체크
    const onCheck = async () => {
        if(!session){
            toast.error('Please login to continue!');
            setShowLoginModal(true);
            return;
        }

        setLoading(true);

        try{
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/updateTodo';
            const fetchParams = {
                id: id,
                email: email,
                completed: !done
            }
    
            const data = await cmFetchPost(fetchUrl, fetchParams);
    
            setTodoList((prev) => prev.map(t => t.id === data.id ? data : t));

        }
        catch(error){
            toast.error("Failed to update completion status");
        }

        setLoading(false);
    }


    return (
        <TodoItemStyle>
            <ItemHead>
                <CheckBlock done={done} onClick={onCheck}>{done && <MdCheck/>}</CheckBlock>
                <Text done={done}>
                    {title}  
                </Text>
                <Hover>
                    <UpdateBlock onClick={clickUpdate}><AiFillEdit/></UpdateBlock>
                    <RemoveBlock onClick={onDelete}><MdDelete /></RemoveBlock>
                </Hover>
            </ItemHead>
            <Content done={done}><pre>{content}</pre></Content>

            {showLoginModal && <LoginModal isOpen={showLoginModal} onRequestClose={() => setShowLoginModal(false)}/>}
            {showUpdateModal && (
                <TodoUpdateModal 
                    isOpen={showUpdateModal} 
                    onRequestClose={() => setShowUpdateModal(false)}
                    head={date} 
                    id={id}
                    title={title}
                    content={content}
                    done={done}
                    startAt={startAt}
                    endAt={endAt}
                    email={session} 
                />
            )}
            
        </TodoItemStyle>
    );
}

export default React.memo(TodoItem);