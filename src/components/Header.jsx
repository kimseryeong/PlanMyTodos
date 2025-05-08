import Logout from './Logout';
import styled from 'styled-components';
import { useSession } from './SessionProvider';

const HeaderStyle = styled.div`
    width: 100%;
    height: 30px;
    position: fixed;
    display: flex;
    font-family: 'pretendard';
`;

const UserInfo = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    padding-right: 20px;
`;

const EmailStyle = styled.span`
    font-size: 18px;
    line-height: normal;
    font-weight: 700;
    margin-right: 10px;
`;

const Header = () => {

    const { session, fetchSession } = useSession();

    return (
        <HeaderStyle>
            {session && 
            <>
                <UserInfo>
                    <EmailStyle>{session.email}</EmailStyle>
                    <Logout />
                </UserInfo>
            </>
            }
        </HeaderStyle>
    );
}

export default Header;