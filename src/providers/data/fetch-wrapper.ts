

// Get Data API
const customFetch = async (url:string, options: RequestInit)=>{
    const accessToken = localStorage.getItem("access_token");

    const headers = options.headers as Record<string,string>;
    
    return await fetch(url, {
        ...options,
        headers:{
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type":"application/json"
        }
    })
}