import { supabase } from '../../../lib/supabaseClient';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';


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
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const onSubmit = (data) => onSignup(data);

    const onSignup = async (inputs) => {

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
                
            // console.log('select data: ', data);
        }
        catch (error) {
            console.log(error);
            alert('문제가 발생하였습니다. 다시 시도하십시오.');
        }


    }

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
                            {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
                        />
                        {errors.email && <span className='err'>Check your email</span>}
                        <input 
                            className='input_row' 
                            type='text' 
                            name='name' 
                            placeholder='name'
                            {...register('name', {required: true})}
                        />
                        <input 
                            className='input_row' 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            {...register('password', {required: true})}
                            />
                        <input 
                            className='input_row' 
                            type='password' 
                            name='passwordCheck' 
                            placeholder='correct your password'
                            {...register('passwordCheck', {required: true})}
                        />
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