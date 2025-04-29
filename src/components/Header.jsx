// import './Header.css';
import Login from './Login';
import Signup from './Signup';
import CmButton from './Common/CmButton';
import styled from 'styled-components';
import { useSession } from './SessionProvider';
import { cmAxiosPost } from '../api/common';

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
    console.log('Header session > ', session);

    //logout
    const onLogout = async () => {
        cmAxiosPost.post('/logout');
    //     const { error } = await supabase.auth.signOut();

    //     setUserInfo(null);
        
    //     if(error) console.log('error: ', error);
    //     alert('로그아웃 되었습니다.');
    }

    

    return (
        <HeaderStyle>
            <Buttons>
                {session ? 
                <>
                    <EmailStyle>{ session.email }</EmailStyle>
                    <CmButton action={onLogout} name={'Logout'}></CmButton>
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