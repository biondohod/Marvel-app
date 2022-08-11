import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers= {'Content-Type': 'application/json'}) => {
         setLoading(true);
         setError(false);

         try {
            const responce = await fetch(url, {method, body, headers});

            if (!responce.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${responce.status}`);
            }

            const data = await responce.json();

            setLoading(false);

            return data;
         } catch(e) {
            setLoading(false);
            setError(true);
            throw e;
         }
    }, []);

    return {request, loading, error}
};

export default useHttp;