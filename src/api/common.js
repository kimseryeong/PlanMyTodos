import { useSetRecoilState } from "recoil";
import { loadingState, todoState } from "../lib/atom";

export const cmFetchPost = async ( fetchUrl, fetchParams ) => {

    const res = await fetch(fetchUrl, {
        method: 'POST'
        ,credentials: 'include'
        , headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
        ,body: JSON.stringify(fetchParams)
    })

    if(!res.ok){
        console.error('cmFetchPost error !! ');
        return;
    }
    
    const data = await res.json();

    return data;
}

