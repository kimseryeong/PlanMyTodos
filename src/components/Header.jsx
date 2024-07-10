import './Header.css';
import Login from './Login';
import Signup from './Signup';
import { userState } from '../lib/atom';
import { supabase } from '../lib/supabaseClient';

import { useRecoilState } from 'recoil';

const Header = () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);

    //logout
    const onLogout = async () => {
        const { error } = await supabase.auth.signOut();

        setUserInfo(null);
        
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