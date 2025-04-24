import { Children, createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    const fetchSession = async () => {
        try {
            const response = await fetch('https://planmytodos-api-production.up.railway.app/user/me', {
                method: 'GET',
                credentials: "include",
            })

            if(response.ok){
                const data = await response.json();
                setSession(data);
            }
            else{
                setSession(null);
            }

            console.log('success to fetch session, userEmail > ', session)

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