import React, { useState } from 'react';
import Modal from 'react-modal';



const Signup = ({children}) => {

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

    const [signupOpen, setSignupOpen] = useState(false);

    const signupClick = () => {
        setSignupOpen(true);
    }

    const closeSignup = () => {
        setSignupOpen(false);
    }

    return (
        <>
            <button onClick={signupClick}>{children}</button>

            <Modal
                isOpen={signupOpen}
                onRequestClose={closeSignup}
                style={style}
            >
                
                <div className='signin-wrap'>
                    <h1>{children}</h1>

                    <div className='input-wrap wrap'>
                        <input className='input_row' type='text' name='email' placeholder='email'/>
                        <input className='input_row' type='text' name='name' placeholder='name'/>
                        <input className='input_row' type='password' name='password' placeholder='password' />
                        <input className='input_row' type='password' name='passwordCheck' placeholder='correct your password'/>
                    </div>
                    <div className='btn-wrap wrap'>
                        <button className='btn' onClick={closeSignup}>cancel</button>
                        <button className='btn backColor'>{ children }</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
export default Signup;