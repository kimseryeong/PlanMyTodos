import styled from 'styled-components';
import { ReactSVG } from "react-svg";
import { CmModal } from './Common/CmModal';


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
    background-color: #fff;
    text-decoration: none;

    &:hover{
        box-shadow: 1px 1px 1px #1976D2;
    }

    svg{
        margin-right: 10px;
    }
`;

const Comment = styled.span`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: normal;
    box-shadow: inset 0 -10px #fbea9d;
`;

export const LoginModal = ({isOpen, onRequestClose}) => {
    
    return (
        <CmModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <Comment>Please Login to use our service 😽 !</Comment>
            
            <GoogleBtn href="https://planmytodos-api-production.up.railway.app/oauth2/authorization/google">
                <ReactSVG src="/images/google.svg"/>
                <span>Login with Google</span>
            </GoogleBtn>
        </CmModal>
    )
}
