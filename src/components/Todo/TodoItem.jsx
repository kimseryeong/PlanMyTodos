import styled, { css } from 'styled-components';
import { MdCheck, MdDelete } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { CmScrollStyle } from '../Common/CmScrollStyle';
import CmButton from '../Common/CmButton';
import { supabase } from '../../lib/supabaseClient';
import { todoState, loadingState } from '../../lib/atom'

import { postFetch } from '../../api/common';

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

    ${CmScrollStyle}
`;


const Buttons = styled.div`
    margin-top: 10px;
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

function TodoItem ({title, content, done, email, id}) {
    console.log('TodoItem', title);
    
    const setTodoList = useSetRecoilState(todoState);
    const [newTodoTitle, setNewTodoTitle] = useState(title);
    const [newTodoContent, setNewTodoContent] = useState(content);
    const [isOpen, setIsOpen] = useState(false);
    const onModal = () => setIsOpen(true);
    const onClose = () => {
        setIsOpen(false);

        //input, textarea onChange 초기화
        setNewTodoTitle(title);
        setNewTodoContent(content);
    }
    const [loading, setLoading] = useRecoilState(loadingState);

    useEffect(() => {
        setNewTodoTitle(title);
        setNewTodoContent(content);
    }, [title, content])

    //수정
    const onUpdate = async () => {
        // setLoading(true);

        onClose();

        // const fetchUrl = '/todo/updateTodo';
        // const fetchParams = {
        //     id: id,
        //     email: email,
        //     title: newTodoTitle,
        //     content: newTodoContent
        // }
        // const response = postFetch(fetchUrl, fetchParams);
        // console.log('onUpdate res > ', response);

        // const { data, error } = await supabase
        //     .from('todolist')
        //     .update({ title: newTodoTitle, content: newTodoContent })
        //     .eq('id', uuid)
        //     .eq('idx', idx)
        //     .select('idx, title, content, complete_state, start_date')

        // if(error) console.log(error);

        // setTodoList((prev) => prev.map(t => t.idx === data[0].idx ? data[0] : t));
        // setLoading(false);
    }

    //삭제
    const onDelete = async () => {
        // setLoading(true);

        // const { data, error } = await supabase
        //     .from('todolist')
        //     .delete()
        //     .eq('id', uuid)
        //     .eq('idx', idx)

        // if(error) console.log(error);
        
        // setTodoList((prev) => prev.filter(t => t.idx !== idx));

        // setLoading(false);
    }

    //완료체크
    const onCheck = async () => {
        // setLoading(true);

        // const { data, error } = await supabase
        //     .from('todolist')
        //     .update({complete_state: !done})
        //     .eq('idx', idx)
        //     .select('idx, title, content, complete_state, start_date')

        // if(error) console.log(' 완료체크 중 실패 > ' , error);

        // const {data: todos, error: todosError} = await supabase.from('todolist')
        //     .select('idx, title, content, complete_state, start_date')
        //     .eq('id', uuid)
        //     .eq('start_date', data[0].start_date)
        //     .order('complete_state', { decending: false })


        // if(todosError) console.log('완료 처리 후 투두리스트 fetch 실패', todosError);

        // setTodoList(todos);

        
        // setLoading(false);
    }


    return (
        <TodoItemStyle>
            <ItemHead>
                <CheckBlock done={done} onClick={onCheck}>{done && <MdCheck/>}</CheckBlock>
                <Text done={done}>
                    {title}
                    
                </Text>
                <Hover>
                    <UpdateBlock onClick={onModal}><AiFillEdit/></UpdateBlock>
                    <RemoveBlock onClick={onDelete}><MdDelete /></RemoveBlock>
                </Hover>
            </ItemHead>
            <Content done={done}><pre>{content}</pre></Content>

            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={style}
            >
                <ModalHead onClick={onClose} >
                    <span>할 일 수정</span>
                    <IoCloseOutline className='icon' size='25'/>
                </ModalHead>
                <ModalBody>
                    <Wrap>
                        <div>제목</div>
                        <Input 
                            autoFocus 
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                            defaultValue={title} 
                        />
                    </Wrap>
                    <Wrap>
                        <div>내용</div>
                        <Textarea 
                            onChange={(e) => setNewTodoContent(e.target.value)} 
                            defaultValue={content}
                        />
                    </Wrap>
                </ModalBody>
                <Buttons>
                    <CmButton action={onUpdate} name={'수정'} backColor={true}></CmButton>
                </Buttons>
            </Modal>

            
        </TodoItemStyle>
    );
}

export default React.memo(TodoItem);