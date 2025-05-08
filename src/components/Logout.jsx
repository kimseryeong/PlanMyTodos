import { cmFetchPost } from "../api/common";
import { useSession } from "../components/SessionProvider"
import { TbLogout } from "react-icons/tb";
import styled from 'styled-components';

const StyledLogout = styled(TbLogout)`

    height: 30px;
    width: 30px;
    padding: 5px;

    &:hover {
        text-box: inherit;
        box-shadow: 1px 1px 1px #242424;
        border-radius: 50%;
        background-color: ${({theme}) => theme.colors.primary}; 
        cursor: pointer;
    }
`;

const Logout = () => {
    
    const { session, fetchSession } = useSession();
    const clickLogout = async () => {
        
        const fetchUrl = 'https://planmytodos-api-production.up.railway.app/logout';
        const fetchParams = {}
        
        const data = await cmFetchPost(fetchUrl, fetchParams);

        if(data.success){
            fetchSession();
        }
    }

    return (
        <StyledLogout onClick={clickLogout}/>
    )
}

export default Logout;