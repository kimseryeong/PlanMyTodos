import styled from 'styled-components';
import { ReactSVG } from "react-svg";
import { CmModal } from './Common/CmModal';

const Comment = styled.span`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 40px;
    line-height: normal;
    box-shadow: inset 0 -10px #fbea9d;
`;

const StyledGoogleBtn = styled(ReactSVG)`
    &:hover .border {
        stroke: #fbea9d !important;
    }
`;

export const LoginModal = ({isOpen, onRequestClose}) => {
    
    return (
        <CmModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <Comment>Please Login to use our service 😽 !</Comment>
            
            <a href="https://planmytodos-api-production.up.railway.app/oauth2/authorization/google">
                <StyledGoogleBtn src="/images/web_light_rd_ctn.svg"/>
            </a>
        </CmModal>
    )
}
