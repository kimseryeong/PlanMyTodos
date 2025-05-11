import axios from "axios";

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

export const cmAxiosPost = axios.create({
    baseURL: 'https://planmytodos-api-production.up.railway.app/',
    timeout: 1000,
    headers:{
        'Content-Type': 'application/json',
        withCredentials: true,
    }
})

export const cmDateToString = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}