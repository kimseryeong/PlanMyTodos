const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

export const postFetch = async ( endpoint, body, options ) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
                ...(options.headers || {}),
            },
            body: JSON.stringify(body),
            ...options,
        })
        if(!res.ok){
            const error = await res.json();
        }

        return res.json();
    }
    catch(error){
        console.error('[POST Fetch] 실패');
        throw error;
    }
}