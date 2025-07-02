import { useEffect, useState } from "react";


export const ScreenSize = () =>{
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    
    useEffect(() => {
    const handleResize = () => {
        const view = { width: window.innerWidth, height: window.innerHeight };
        setSize(view);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
}, []);

    
    return size;
}
