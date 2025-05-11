import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { IoCloseOutline } from "react-icons/io5";

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
        ,backgroundColor: '#fefae0'
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
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CmModal = ({ title, isOpen, onRequestClose, children }) => {

    if(!isOpen) return null;

    return (

        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={style}
            >
                <ModalHead onClick={onRequestClose} >
                    <span>{title}</span>
                    <IoCloseOutline className='icon' size='20'/>
                </ModalHead>
                <ModalBody>
                    { children }
                </ModalBody>
            </Modal>
        </>
    );
}