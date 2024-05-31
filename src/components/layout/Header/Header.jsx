import './Header.css';
import Login from './Login';
import Signup from './Signup';
import { globalState } from '../../../lib/atom';

import { useRecoilState, useRecoilValue } from 'recoil';

const Header = () => {

    const [userSession, setUserSession] = useRecoilState(globalState);
    // console.log('Header에서 userSession: ', userSession);

    //logout
    const onLogout = () => {
        sessionStorage.removeItem('userEmail');

        setUserSession(null);
    }

    return (
        <header className='header'>
            <p className='logo'>ToDoList</p>
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