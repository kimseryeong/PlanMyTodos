import CmButton from "./Common/CmButton";
import { cmFetchPost } from "../api/common";
import { useSession } from "../components/SessionProvider"

const Logout = ({children}) => {
    
    const { session, fetchSession } = useSession();
    const clickLogout = async () => {
        console.log('clickLogout');
        
        const fetchUrl = 'https://planmytodos-api-production.up.railway.app/logout';
        const fetchParams = {}
        
        const data = await cmFetchPost(fetchUrl, fetchParams);

        if(data.success){
            fetchSession();
        }
    }

    return (
        <CmButton action={clickLogout} name={children}></CmButton>
    )
}

export default Logout;