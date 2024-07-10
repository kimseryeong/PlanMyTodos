import Header from "./Header";
import Contents from "./Contents";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../lib/atom";
import { supabase } from "../lib/supabaseClient";


export default function Layout (){
    const [userInfo, setUserInfo] = useRecoilState(userState);
    
    useEffect(() => {

        supabase.auth.getSession().then(({data: {session}}) => {
            // console.log(session);
            if(session) {
                setUserInfo(session);
            }
            
        })
        
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if(session) {
                setUserInfo(session);
            }
            return () => subscription.unsubscribe();
        })
    }, [])
    
    return (
        <>
            <Header/>
            <Contents/>
        </>
    );
}