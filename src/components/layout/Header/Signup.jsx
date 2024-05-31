import { supabase } from '../../../lib/supabaseClient';
import { globalState } from '../../../lib/atom';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

const style = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)",}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '410px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
    }
}

const Signup = ({children}) => {

    //signup modal
    const [signupOpen, setSignupOpen] = useState(false);
    const signupClick = () => setSignupOpen(true);
    const closeSignup = () => setSignupOpen(false);

    //signup form submit
    const { register, handleSubmit, watch, formState: {errors}, getValues } = useForm();
    const onSubmit = (data) => onSignup(data);

    const onSignup = async (inputs) => {

        //email 중복 확인
        const {data, error} = await supabase
            .from('USER_INFO')
            .select('email')
            .eq('email', inputs.email)
            
        
        if(data.length > 0){
            alert('이미 사용중인 이메일입니다.');
            return;
        }

        try{
            const {data, error} = await supabase
                .from('USER_INFO')
                .insert([
                    {
                        email: inputs.email
                        , name: inputs.name
                        , password: inputs.password
                    }
                ])
                .select('*')
                
            setSession(data[0]);
            closeSignup();
        }
        catch (error) {
            // console.log(error);
            alert('문제가 발생하였습니다. 다시 시도하십시오.');
        }
    }

    //supabase insert 후 session 에 담기
    const setSession = (data)=>{
        sessionStorage.setItem('signupEmail', data.email);

        const signupEmail = sessionStorage.getItem('signupEmail');
        setUserSession(signupEmail);
    }
    
    const [userSession, setUserSession] = useRecoilState(globalState);

    return (
        <>
            <button onClick={signupClick}>{children}</button>

            <Modal
                isOpen={signupOpen}
                onRequestClose={closeSignup}
                style={style}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className='signin-wrap'>
                    <h1>{children}</h1>

                    <div className='input-wrap wrap'>
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
                        
                        {errors.email && <span className='err'>{ errors.email.message }</span>}
                        <input 
                            className='input_row' 
                            type='text' 
                            name='name' 
                            placeholder='name'
                            {...register('name', {
                                required: '이름은 필수입니다.'
                            })}
                        />
                        {errors.name && <span className='err'>{ errors.name.message }</span>}
                        
                        <input 
                            className='input_row' 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            {...register('password', {
                                required: '비밀번호는 필수입니다.'
                                ,minLength: {value: 5, message: '5자리 이상의 비밀번호를 입력하세요.'}
                                ,maxLength: {value: 20, message: '20자 이내의 비밀번호를 입력하세요.'}
                            })}
                        />
                        {errors.password && <span className='err'>{ errors.password.message }</span>}
                        
                        <input 
                            className='input_row' 
                            type='password' 
                            name='passwordCheck' 
                            placeholder='correct your password'
                            {...register('passwordCheck', {
                                required: '비밀번호는 필수입니다.'
                                ,minLength: {value: 5, message: '5자리 이상의 비밀번호를 입력하세요.'}
                                ,maxLength: {value: 20, message: '20자 이내의 비밀번호를 입력하세요.'}
                                ,validate: {checkPassword: (val) => {
                                    const { password } = getValues();
                                    return password === val || '비밀번호가 일치하지 않습니다.'
                                }}
                            })}
                        />
                        {errors.passwordCheck && <span className='err'>{ errors.passwordCheck.message }</span>}
                    </div>
                    <div className='btn-wrap wrap'>
                        <button className='btn' onClick={closeSignup}>cancel</button>
                        <button className='btn backColor' type='submit'>{ children }</button>
                    </div>
                </div>
            </form>
            </Modal>
        </>
    );
}
export default Signup;