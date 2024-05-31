import { supabase } from '../../../lib/supabaseClient';
import { globalState } from '../../../lib/atom';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa'
import { GrSecure } from 'react-icons/gr'
import { useRecoilState } from 'recoil';

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)",}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '300px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
    }
}

const Login = ({children}) => {
    //login modal 
    const [loginOpen, setLoginOpen] = useState(false);
    const loginClick = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    //login form submit
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const onSubmit = (data) => onLogin(data);

    const onLogin = async (inputs) => {
        try{
            const {data, error} = await supabase
                .from('USER_INFO')
                .select('email, name')
                .eq('email', inputs.email)
                .eq('password', inputs.password)

            console.log('length: ', data.length);
            
            if(data.length === 0){
                alert('일치하는 회원 정보가 없습니다. ');
                return;
            }

            setSession(data[0]);
            closeLogin();
        }
        catch (error){
            console.log(error);
            alert('문제가 발생하였습니다. 다시 시도하십시오.');
        }

    }

    //supabase select 후 session 에 담기
    const setSession = (data)=>{
        sessionStorage.setItem('loginEmail', data.email);

        const loginEmail = sessionStorage.getItem('loginEmail');
        setUserSession(loginEmail);
    }
    const [userSession, setUserSession] = useRecoilState(globalState);

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
                    <button className='btn' onClick={closeLogin}>cancel</button>
                    <button className='btn backColor' type='submit'>{ children }</button>
                </div>
            </form>
            </Modal>
        </>

    );
}
export default Login;