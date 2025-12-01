import './App.css'
import {useState, useEffect} from 'react';

export default function Introductions() {

    const [introductions, setIntroductions] = useState(null);
    const [error, setError] = useState(null);
    useEffect(
        () => {
            fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
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

        if(error) return <p>Error: {error}</p>
        if(introductions) return <p>Loading...</p>

    return(
    <>
        {introductions.map((data, index) => (<article key={index}>
            <hr/>
            <h3>{data.name.first} {data.name.middleInitial ? `${data.name.middleInitial}.` : ""} {data.name.last} {data.divider} {data.mascot}</h3>
            <figure>
                <img src={`https://dvonb.xyz${data.media.src}`} width={400} alt={data.media.caption}/>
                <figcaption>{data.media.caption}</figcaption>
            </figure>
            <p>{data.personalStatement}</p>
            <ul>
                <li><strong>Personal Background: </strong>{data.backgrounds.personal}</li>
                <li><strong>Professional Background: </strong>{data.backgrounds.professional}</li>
                <li><strong>Academic Background: </strong>{data.backgrounds.academic}</li>
                <li><strong>Primary Computer: </strong>{data.platform.device}, {data.platform.os}</li>
                <li><strong>Courses I'm Taking & Why: </strong></li>
                    <ul>
                        {data.courses.map((course, courseIndex) => {
                        <li key={courseIndex}>
                            <strong>{course.code} {course.name} :</strong> {course.reason}
                        </li>
                        })}
                        
                    </ul>
                    <li><strong>Funny/Interesting Item to Remember Me By: </strong> {data.funFact}</li>
                    <li><strong>Addintional: </strong>{data.additional ? `${data.additional}` : ""}</li>
            </ul>
            
            <p>"{data.quote.text}"</p>
            <p>{data.quote.author}</p>
            <p>
            <a href={data.links.charlotte} target="_blank" rel="noopener noreferrer">CLT Web</a> {data.divider}{" "}
            <a href={data.links.github} target="_blank" rel="noopener noreferrer">GitHub</a> {data.divider}{" "}
            <a href={data.links.githubio} target="_blank" rel="noopener noreferrer">GitHub.io</a> {data.divider}{" "}
            <a href={data.links.itis3135} target="_blank" rel="noopener noreferrer">ITIS3135</a> {data.divider}{" "}
            <a href={data.links.freecodecamp} target="_blank" rel="noopener noreferrer">freeCodeCamp</a> {data.divider}{" "}
            <a href={data.links.codecademy} target="_blank" rel="noopener noreferrer">Codecademy</a> {data.divider}{" "}
            <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> {data.divider}{" "}
            </p>
        </article>) )}
        
    </>
    )
    
}