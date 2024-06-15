import './Header.css';
import Login from './Login';
import Signup from './Signup';
import { userState } from '../lib/atom';
import { supabase } from '../lib/supabaseClient';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Header = () => {

    //session recoil 저장하기
    const [userInfo, setUserInfo] = useRecoilState(userState);

    useEffect(() => {

        supabase.auth.getSession().then(({data: {session}}) => {
            // console.log(session);
            if(session) {
                setUserInfo(session);
            }
            
        })
        
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if(session) {
                setUserInfo(session);
            }
            return () => subscription.unsubscribe();
        })
    }, [userInfo])


    //logout
    const onLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if(error) console.log('error: ', error);
        alert('로그아웃 되었습니다.');
    }

    

    return (
        <header className='header'>
            <div className='btn-contents'>
                {userInfo ? 
                <>
                    <span className='userEmail backColor'>{ userInfo.user.email }</span>
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