import './Header.css';
import Login from './Login';
import Signup from './Signup';
import { globalState } from '../../../lib/atom';
import { supabase } from '../../../lib/supabaseClient';

import { useRecoilState, useRecoilValue } from 'recoil';

const Header = () => {

    const [userSession, setUserSession] = useRecoilState(globalState);
    // console.log('Header에서 userSession: ', userSession);

    //logout
    const onLogout = async () => {
        const { error } = await supabase.auth.signOut();

        localStorage.removeItem('userEmail');
        setUserSession(null);

        alert('로그아웃 되었습니다.');
        if(error) console.log('error: ', error);
    }

    return (
        <header className='header'>
            {/* <p className='logo'>ToDoList</p> */}
            <div className='btn-contents'>
                {userSession ? 
                <>
                    <span className='userEmail backColor'>{ userSession }</span>
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