import Logout from './Logout';
import styled from 'styled-components';
import { useSession } from './SessionProvider';
import { ReactSVG } from "react-svg";

const HeaderStyle = styled.div`
    width: 100%;
    height: 40px;
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
    font-size: 16px;
    line-height: normal;
    font-weight: 600;
    margin: 3px 10px;
    background-color: ${({theme}) => theme.colors.back};
`;

const GoogleBtn = styled.a`
    &:hover {
        cursor: pointer;
    }
`;

const Tooltip = styled.span`
    position: absolute;
    top: 120%;
    left: -100%;
    transform: translateX(-50%);
    background-color: ${({theme}) => theme.colors.light};
    color: black;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    pointer-events: none;
    z-index: 10;

    &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        right: 9%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent ${({theme}) => theme.colors.light} transparent;
    }

`;


const StyledGoogleSVG = styled(ReactSVG)`
    &:hover svg rect {
        stroke: ${({theme}) => theme.colors.strong};
    }

    
`;

const GoogleDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    //margin-right: 40px;
    cursor: pointer;

    &:hover .tooltip{
        opacity: 1;
        visibility: visible;
    }
`;

const Header = () => {

    const { session, fetchSession } = useSession();

    return (
        <HeaderStyle>
            <UserInfo>
                {session ?
                <>
                    <EmailStyle>{session} 😽 </EmailStyle>
                    <Logout />
                </>
                :
                <GoogleDiv>
                    <GoogleBtn href="https://planmytodos-api-production.up.railway.app/oauth2/authorization/google">
                        <Tooltip className="tooltip">Sign In with Google</Tooltip>
                        <StyledGoogleSVG src="/images/web_light_rd_na.svg"/>
                    </GoogleBtn>
                </GoogleDiv>
                }
            </UserInfo>
        </HeaderStyle>
    );
}

export default Header;