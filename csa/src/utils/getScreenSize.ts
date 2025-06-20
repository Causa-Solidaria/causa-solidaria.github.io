import { useEffect, useState } from "react";


export function ScreenSize(){
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
    
        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return size;
}
