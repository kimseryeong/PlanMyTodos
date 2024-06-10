import './Header.css';
import Login from './Login';
import Signup from './Signup';
import { globalState, globalUuid } from '../../../lib/atom';
import { supabase } from '../../../lib/supabaseClient';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Header = () => {

    const userEmail = useRecoilValue(globalState);
    const userUuid = useRecoilValue(globalUuid);

    console.log('Header: ', userEmail);
    console.log(userUuid);

    //logout
    const onLogout = async () => {
        const { error } = await supabase.auth.signOut();

        // localStorage.removeItem('userEmail');
        // setUserEmail(null);

        if(error) console.log('error: ', error);
        alert('로그아웃 되었습니다.');
    }


    return (
        <header className='header'>
            {/* <span className='logo'>ToDoList</span> */}
            <div className='btn-contents'>
                {userEmail ? 
                <>
                    <span className='userEmail backColor'>{ userEmail }</span>
                    <button onClick={onLogout}>Logout</button>
                </>
                :
                <>
                    <Login>Login</Login>
                    <Signup>Sign Up</Signup>
                </>
                }
            </div>
        </header>
    );
}

export default Header;