import {useEffect} from "react";

export const useAsync = (asyncFn, onSuccess, ...args) => {
    useEffect(() => {
        let isMounted = true;
        asyncFn(...args).then(data => {
            if(isMounted) onSuccess(data);
        })
        return () => isMounted = false
    }, [asyncFn, args, onSuccess]);
}