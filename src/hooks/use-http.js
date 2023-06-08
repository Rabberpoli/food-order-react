import { useEffect, useState } from "react";

function useHttp(url, method) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        (
            async function(){
                setIsLoading(true);
                const response = await fetch(url,
                    {
                        method: method || 'GET',
                        mode: 'cors',
                        headers: {
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*"     
                        }
                    }
                    ); 

                    
                if (!response.ok) {
                    setIsError(true);
                }
                const jsonBody = await response.json();
                setData(jsonBody);
                setIsLoading(false);
            }
        )()
    }, [url]);

    return { isLoading, isError, data }
}

export default useHttp;