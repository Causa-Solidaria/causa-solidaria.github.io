import { useEffect, useState } from "react"
import Routes from "../Rotas.json"





export default function Root__(){
    const [load, _ ] = useState<boolean>(true)


    /// leva para a home automatico
    useEffect(()=>{
        if (load) window.location.href = Routes.Home

    }, [load])

    return <>
    </>
}