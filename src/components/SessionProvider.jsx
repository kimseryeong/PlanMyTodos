import { Children, createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    const fetchSession = async () => {

        try {
            const fetchUrl = 'https://planmytodos-api-production.up.railway.app/user/info'

            const response = await fetch(fetchUrl, {
                method: 'GET',
                credentials: "include",
            })

            if(response.ok){
                const data = await response.json();
                
                if(data.email){
                    setSession(data.email);
                    toast.success('Successfully Login!');
                }
            }
        }
        catch(error){
            console.error('fail to get session', error);
            setSession(null);
        }
    }

    useEffect(() => {
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ session, fetchSession }}>
            { children }
        </SessionContext.Provider>
    )
}

export const useSession = () => useContext(SessionContext);