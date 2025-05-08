import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { useSession } from './SessionProvider';

const GoogleBtn = styled.a`
    margin-top: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    width: 90%;
    height: 45px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #1976D2;
    color: inherit;
    text-decoration: none;

    &:hover{
        box-shadow: 1px 1px 1px #1976D2;
    }

    svg{
        margin-right: 10px;
    }
`;

const CommentDiv = styled.div`
    font-size: 14px;
`;

const GoogleAuth = () => {
    return (
        <>
            <CommentDiv>{ "Please Login to use our service :> 😽" }</CommentDiv>

        <div>
            <GoogleBtn href="https://planmytodos-api-production.up.railway.app/oauth2/authorization/google">
            <ReactSVG src="/images/google.svg"/>
                <span>Login with Google</span>
            </GoogleBtn>
        </div>
        </>
    )
}

export default GoogleAuth;