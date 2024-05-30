import { supabase } from '../../../lib/supabaseClient';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

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
        }
        catch (error){
            console.log(error);
            alert('문제가 발생하였습니다. 다시 시도하십시오.');
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
                <div className='input-wrap wrap'>
                    <input 
                        className='input_row' 
                        type='text' 
                        name='email' 
                        placeholder='email'
                        {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
                    />
                    {errors.email && <span className='err'>Check your email</span>}
                    <input 
                        className='input_row' 
                        type='password' 
                        name='password' 
                        placeholder='password'
                        {...register('password', {required: true})}
                    />
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