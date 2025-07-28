import { useEffect, useState } from "react";


export const ScreenSize = () =>{
    const [size, setSize] = useState({
        width: 1200,
        height: 600,
    });
    
    useEffect(() => {
        const handleResize = () => {
            const view = { width: Math.trunc(window.innerWidth), height: Math.trunc(window.innerHeight) };
            setSize(view);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    return size;
}
