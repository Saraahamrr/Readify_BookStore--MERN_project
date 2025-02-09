import axios from "axios";
import { useEffect } from "react";

export default function Settings(){
    useEffect(()=>{
        const fetch = async () =>{
            const response = await axios.get("http://localhost:3000");
        }
    },[])
    return(
        <p>Settings</p>
    );
}