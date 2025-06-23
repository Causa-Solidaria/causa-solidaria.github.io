import { useEffect, useState } from "react";


export function ScreenSize(){
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    
    useEffect(() => {
    const handleResize = () => {
        const view = { width: (window.visualViewport.width), height: window.visualViewport.height };
        setSize(view);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
}, []);

    
    return size;
}
