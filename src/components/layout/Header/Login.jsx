import React, { useState } from 'react';
import Modal from 'react-modal';

const Login = ({children}) => {
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
    const [loginOpen, setLoginOpen] = useState(false);

    const loginClick = () => {
        setLoginOpen(true);
    }

    const closeLogin = () => {
        setLoginOpen(false);
    }

    return (
        <>
            <button onClick={loginClick}>{children}</button>

            <Modal
                isOpen={loginOpen}
                onRequestClose={closeLogin}
                style={style}
            >

                <h1>{children}</h1>
                <div className='input-wrap wrap'>
                    <input className='input_row' type='text' name='email' placeholder='email'/>
                    <input className='input_row' type='password' name='password' placeholder='password'/>
                </div>
                <div className='btn-wrap wrap'>
                    <button className='btn' onClick={closeLogin}>cancel</button>
                    <button className='btn backColor'>{ children }</button>
                </div>
            </Modal>
        </>

    );
}
export default Login;