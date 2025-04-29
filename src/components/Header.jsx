// import './Header.css';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import styled from 'styled-components';
import { useSession } from './SessionProvider';

const HeaderStyle = styled.div`
    width: 100%;
    height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ddd;
    background-color: #fff;
    font-family: 'pretendard';
`;

const Buttons = styled.div`
    display: flex;
    margin-left: auto;
    padding: 0 10px;
    align-items: center;
`;

const EmailStyle = styled.span`
    font-size: 18px;
    margin-right: 5px;
    //background-color: #EAF2F8;
`;

const Header = () => {

    const { session, fetchSession } = useSession();
    console.log(session);
    
    return (
        <HeaderStyle>
            <Buttons>
                {session ? 
                <>
                    <EmailStyle>{ session.email }</EmailStyle>
                    <Logout>Logout</Logout>
                </>
                :
                <>
                    <Login>Login</Login>
                    <Signup>Sign Up</Signup>
                </>
                }
            </Buttons>
        </HeaderStyle>
    );
}

export default Header;