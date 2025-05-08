import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { MdAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dateState, todoState, errorState } from '../../lib/atom';
import Loading from '../../Loading';
import CmButton from '../Common/CmButton';
import { CmScrollStyle } from '../Common/CmScrollStyle';
import { useSession } from '../SessionProvider';
import { cmFetchPost } from '../../api/common';
import { LoginModal } from '../LoginModal';
import { TodoModal } from './TodoModal';

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

    ${CmScrollStyle}
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
    const { session, fetchSession } = useSession();
    const email = session ? session.email : null;
    
    const [loading, setLoading] = useState(false);

    const [ showLoginModal, setShowLoginModal ] = useState(false);
    const [ showTodoModal, setShowTodoModal ] = useState(false);

    const handleSetModal = () => {

        if(!email){
            setShowTodoModal(true);
        }
        else{
            setShowLoginModal(true);
        }
    }

    return (
        <>
            <CreateItem onClick={handleSetModal}> <MdAdd />New</CreateItem> 
            {loading && <Loading loading={loading}/>}
            
            {showLoginModal && <LoginModal isOpen={showLoginModal} onRequestClose={() => setShowLoginModal(false)}/>}
            {showTodoModal && <TodoModal title="New" email={email} isOpen={showTodoModal} onRequestClose={() => setShowTodoModal(false)}/>}
        
        </>
    );
}