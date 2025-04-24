import { Children, createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    const fetchSession = async () => {

        await fetch('https://planmytodos-api-production.up.railway.app/user/me', {
                method: 'GET',
                credentials: 'include',
            })
            .then(res => {
                if(!res.ok) console.error('fail to get session');
                res.json()
            })
            .then(data => {
                setSession(data.email);
            })
            .catch(error => console.log(error))
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