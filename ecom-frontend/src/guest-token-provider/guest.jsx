import axios from "axios";
import { useEffect } from "react";

export default function Guest(){
    useEffect(() => {
        const guestToken = localStorage.getItem('guest-token')
        if(!guestToken) {
            axios.post('http://localhost:5000/guests')
            .then(result => {
                const token = result.data.guest_token;
                localStorage.setItem('guest-token', token)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])
    return null;
}