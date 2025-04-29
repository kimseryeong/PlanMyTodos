import CmButton from './Common/CmButton';
import CmErrorMsg from './Common/CmErrorMsg';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";

import { cmAxiosPost } from '../api/common';
import { useSession } from './SessionProvider';

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '380px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,fontFamily: 'pretendard'
    }
}

const SignupForm = styled.div`
    margin: 20px;
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

const Signup = ({children}) => {

    //signup modal
    const [signupOpen, setSignupOpen] = useState(false);
    const signupClick = () => setSignupOpen(true);
    const closeSignup = () => {
        setSignupOpen(false);
        reset({
            email: null
            ,password: null
            ,passwordCheck: null
        })
    }

    const { session, fetchSession } = useSession();

    //signup form submit
    const { register, handleSubmit, reset, formState: {errors}, getValues } = useForm();
    const onSubmit = async (inputs) => {
        console.log(`onSubmit click .. inputs:`, inputs)
        
        try{
            const res = await cmAxiosPost.post('/user/signup', inputs);
            debugger
            
            if(res.ok){
                alert(res.data.message);
                fetchSession();
                return;
            }
            const data = await res.json();

            if(data.isError){
                console.error('fail signup because of :', data.message);
            }

        }
        catch (error) {
            console.error("axios signup 실패", error);
            
        }
    }
    
    return (
        <>
            <CmButton type={'button'} action={signupClick} name={children}></CmButton>

            <Modal
                isOpen={signupOpen}
                onRequestClose={closeSignup}
                style={style}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className='signin-wrap'>
                    <h2>{children}</h2>

                    <SignupForm>
                        <InputWrap>
                            <Icon><FaUser size='25'/></Icon>
                            <Input 
                                className='input_row' 
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
                        {errors.email && <CmErrorMsg msg={ errors.email.message }></CmErrorMsg>}
                        
                        <InputWrap>
                            <Icon><RiLockPasswordLine size='25'/></Icon>
                            <Input 
                                className='input_row' 
                                type='password' 
                                name='password' 
                                placeholder='password'
                                {...register('password', {
                                    required: '비밀번호는 필수입니다.'
                                    ,minLength: {value: 6, message: '6자리 이상의 비밀번호를 입력하세요.'}
                                    ,maxLength: {value: 20, message: '20자 이내의 비밀번호를 입력하세요.'}
                                })}
                            />
                        </InputWrap>
                        {errors.password && <CmErrorMsg msg={ errors.password.message }></CmErrorMsg>}
                        
                        <InputWrap>
                            <Icon><RiLockPasswordFill size='25'/></Icon>
                            <Input 
                                className='input_row' 
                                type='password' 
                                name='passwordCheck' 
                                placeholder='correct your password'
                                {...register('passwordCheck', {
                                    required: '비밀번호는 필수입니다.'
                                    ,minLength: {value: 6, message: '6자리 이상의 비밀번호를 입력하세요.'}
                                    ,maxLength: {value: 20, message: '20자 이내의 비밀번호를 입력하세요.'}
                                    ,validate: {checkPassword: (val) => {
                                        const { password } = getValues();
                                        return password === val || '비밀번호가 일치하지 않습니다.'
                                    }}
                                })}
                            />
                        </InputWrap>
                        {errors.passwordCheck && <CmErrorMsg msg={ errors.passwordCheck.message }></CmErrorMsg>}
                    </SignupForm>
                    <Buttons>
                        <CmButton action={closeSignup} name={'cancel'} type={'button'}></CmButton>
                        <CmButton  action={()=>{}} name={children} backColor={true} type={'submit'}></CmButton>
                    </Buttons>
                </div>
            </form>
            </Modal>
        </>
    );
}
export default Signup;