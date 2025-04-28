import { supabase } from '../lib/supabaseClient';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FaPray, FaUser } from 'react-icons/fa'
import { GrSecure } from 'react-icons/gr'
import styled from 'styled-components';
import CmButton from './Common/CmButton';
import CmErrorMsg from './Common/CmErrorMsg';
import { ReactSVG } from "react-svg";
import axios from "axios";

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '400px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
        ,fontFamily: 'pretendard'
    }
}

const GoogleBtn = styled.a`
    margin-top: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    width: 90%;
    height: 45px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #1976D2;
    color: inherit;
    text-decoration: none;

    &:hover{
        box-shadow: 1px 1px 1px #1976D2;
    }

    svg{
        margin-right: 10px;
    }
`;

const HrSect = styled.div`
    color: #a0a0a0;
    font-size: 16px;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 20px 0;

    &::before, &::after{
        content: "";
        flex-grow: 1;
        height: 1px;
        line-height: 0;
        margin: 0 16px;
        background-color: #a0a0a0;
    }
`;

const LoginForm = styled.div`
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
`;

const InputWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.span`
    width: 25px;
    height: 25px;
`;

const Input = styled.input`
    height: 45px;
    margin: 5px;
    padding-left: 10px;
    font-size: 18px;
    border: 1px solid #ddd;
    width: 100%;

    &::placeholder{
        font-size: 18px;
        font-weight: 100;
        font-style: italic;
        color: #bababa;
    }
`;

const Buttons = styled.div`
    margin-top: 20px;
`;

const getCsrfToken = () => {
    const matches = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return matches ? decodeURIComponent(matches[1]) : null;
}

const Login = ({children}) => {

    const csrfToken = getCsrfToken();

    //login modal 
    const [loginOpen, setLoginOpen] = useState(false);
    const loginClick = () => setLoginOpen(true);
    const closeLogin = () => {
        setLoginOpen(false);
        reset({
            email: null
            ,password: null
        })
    }

    //login form submit
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    const onSubmit = async (inputs) => {
        

        try{
            const res = await axios.post('https://planmytodos-api-production.up.railway.app/user/login', inputs, {
                withCredentials: true,
            });
            console.log("axios 로그인 성공!", res.data);
        }
        catch (error) {
            console.error("axios 로그인 실패", error);
            
        }
        // const {data, error} = await supabase.auth.signInWithPassword({
        //     email: inputs.email,
        //     password: inputs.password,
        // })

        // if(error){
        //     if(error.status === 400){
        //         alert('로그인 정보가 올바르지 않습니다.')
        //     }
        //     else{
        //         alert('문제가 발생하였습니다. 다시 시도하십시오.');
        //     }
        // }
    }



    return (
        <>
            <CmButton action={loginClick} name={children}></CmButton>

            <Modal
                isOpen={loginOpen}
                onRequestClose={closeLogin}
                style={style}
            >
            <h2>{children}</h2>
                    
            <GoogleBtn href="https://planmytodos-api-production.up.railway.app/oauth2/authorization/google">
            <ReactSVG src="/images/google.svg"/>
                <span>Login with Google</span>
            </GoogleBtn>

            <HrSect>or</HrSect>     

            <form onSubmit={handleSubmit(onSubmit)}>
                <LoginForm>
                    <InputWrap>
                        
                        <Icon><FaUser size='25'/></Icon>
                        
                        <Input
                            type='text' 
                            name='email' 
                            placeholder='email'
                            {...register('email', {
                                required: 'email은 필수입니다.'
                                , pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                            ,message: '이메일 형식을 확인하세요.'}
                            })}
                        />
                    </InputWrap>
                    {errors.email && <CmErrorMsg msg={errors.email.message}></CmErrorMsg>}
                    
                    <InputWrap>
                        <Icon><GrSecure size='25'/></Icon>
                        <Input 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            {...register('password', {
                                required: '비밀번호는 필수입니다.'
                            })}
                        />
                    </InputWrap>
                    {errors.password && <CmErrorMsg msg={errors.password.message}></CmErrorMsg>}
                </LoginForm>
                <Buttons>
                    <CmButton action={closeLogin} name={'cancel'}></CmButton>
                    <CmButton action={()=>{}} name={children} backColor={true} type='submit'></CmButton>
                </Buttons>
            </form>

            
            </Modal>
        </>

    );
}
export default Login;