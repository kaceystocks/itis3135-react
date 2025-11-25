import './App.css'
import {useState, useEffect} from 'react';

export default function Introductions() {

    const [introductions, setIntroductions] = useState(null);
    const [error, setError] = useState(null);
    useEffect(
        () => {
            fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students/?full=1")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else{
                    throw new Error("Network response not okay");
                }
            })
            .then((data) => setIntroductions(data))
            .catch((error) => setError(error.message));
        }, []);

        

    return(
    <>
        <p>testing if works</p>
        
    </>
    )
    
}