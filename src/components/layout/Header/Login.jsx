import { supabase } from '../../../lib/supabaseClient';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa'
import { GrSecure } from 'react-icons/gr'

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
    }
}

const Login = ({children}) => {
    //login modal 
    const [loginOpen, setLoginOpen] = useState(false);
    const loginClick = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    //login form submit
    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = async (inputs) => {

        const {data, error} = await supabase.auth.signInWithPassword({
            email: inputs.email,
            password: inputs.password,
        })

        if(error){
            if(error.status === 400){
                alert('로그인 정보가 올바르지 않습니다.')
            }
            else{
                alert('문제가 발생하였습니다. 다시 시도하십시오.');
            }
        }
    }


    //google login
    const onGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            }
        })
    
        if(error){
            // console.log('supabase 구글 로그인 에러: ', error);
            return;
        }
    }


    return (
        <>
            <button onClick={loginClick}>{children}</button>

            <Modal
                isOpen={loginOpen}
                onRequestClose={closeLogin}
                style={style}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{children}</h1>
                <div className='wrap input-wrap login'>
                    <div className='input-container'>
                        
                        <span className='icon'><FaUser size='25'/></span>
                        
                        <input 
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
                    </div>
                    {errors.email && <span className='err loginErr'>{ errors.email.message }</span>}
                    
                    <div className='input-container'>
                        <span className='icon'><GrSecure size='25'/></span>
                        <input 
                            className='input_row' 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            {...register('password', {
                                required: '비밀번호는 필수입니다.'
                            })}
                        />
                    </div>
                    {errors.password && <span className='err loginErr'>{ errors.password.message }</span>}
                </div>
                <div className='btn-wrap wrap'>
                    <button className='btns' onClick={closeLogin}>cancel</button>
                    <button className='btns backColor' type='submit'>{ children }</button>
                </div>
            </form>

            <div className='hr-sect'>or</div>     
                    
            <button className='googleBtn' onClick={onGoogleLogin}>
                <img className='social-logo' src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000' alt='google logo'/>
                구글 계정으로 로그인
            </button>
            </Modal>
        </>

    );
}
export default Login;