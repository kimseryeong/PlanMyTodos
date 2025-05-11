import { CmModal } from "../Common/CmModal";
import styled, {css} from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import toast from "react-hot-toast";

import { useRecoilState, useRecoilValue } from 'recoil';
import { todoState } from '../../lib/atom';
import { cmFetchPost } from '../../api/common';
import { CmScrollStyle } from '../Common/CmScrollStyle';
import { useSession } from "../SessionProvider";
import { TodoUpdateModal } from "./TodoUpdateModal";
import { LoginModal } from "../LoginModal";

const EventDetail = styled.div`
    margin: 20px 0;
    flex: 1 1 auto;
    width: 100%;

    ${CmScrollStyle}
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
`;

const Content = styled.div`
    font-size: 14px;

    pre{
        font-size: 13.5px;
        white-space: pre-wrap;
        font-family: 'pretendard'
    }
`;

const Buttons = styled.div`
    display: flex;
    margin: auto auto 0 auto;
`;

const IconBlock = styled.div`
    margin: 5px;
    &:hover{
        cursor: pointer;
    }

    ${props => props.type === 'update' && css`
        &:hover{color: ${({theme}) => theme.colors.primary};}
    `}

    ${props => props.type === 'delete' && css`
        &:hover{color: #ef476f;}
    `}
`;


export const TodoDetailModal = ({date, title, content,isOpen, onRequestClose, id}) => {
    const { session } = useSession();
    const [ showLoginModal, setShowLoginModal ] = useState(false);
    const [todoList, setTodoList] = useRecoilState(todoState);

    const onDelete = async () => {

        if(!session){
            toast.error('Please login to continue!');
            setShowLoginModal(true);

            return;
        }

        try{
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/todo/deleteTodo';
            const fetchParams = {
                id: id,
                email: session,
            }
    
            const data = await cmFetchPost(fetchUrl, fetchParams);
            setTodoList(data);

        }
        catch(error){
            toast.error('Failed to delete todo');
        }
            
        onRequestClose();
    }

    const [clickUpdate, setClickUpdate] = useState(false);
    const onClickUpdate = () => {
        if(!session){
            toast.error('Please login to continue!');
            setShowLoginModal(true);

            return;
        }

        setClickUpdate(true);
    }
    
    return (
        <>
        <CmModal title={date} isOpen={isOpen} onRequestClose={onRequestClose}>
            <EventDetail>
                <Title>{title}</Title>
                <Content><pre>{content}</pre></Content>
            </EventDetail>
            <Buttons>
                <IconBlock type={'delete'}><MdDelete onClick={onDelete} size={'20'}/></IconBlock>
                <IconBlock type={'update'}><AiFillEdit onClick={onClickUpdate} size={'20'}/></IconBlock>
            </Buttons>
        </CmModal>

        {showLoginModal && <LoginModal isOpen={showLoginModal} onRequestClose={() => setShowLoginModal(false)}/>}
        { clickUpdate && (
            <TodoUpdateModal 
                isOpen={clickUpdate} 
                onRequestClose={() => setClickUpdate(false)}
                head={date} 
                id={id}
                title={title}
                content={content}
                email={session} 
            /> 
        )}

        </>
    );
}