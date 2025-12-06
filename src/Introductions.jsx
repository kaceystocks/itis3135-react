/*import './App.css'
import {useState, useEffect} from 'react';*/

/*export default function Introductions() {

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
        if(!introductions) return <p>Loading...</p>

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
                <li><strong>Courses I'm Taking & Why: </strong>
                    <ul>
                        {data.courses.map((course, courseIndex) => (
                        <li key={courseIndex}>
                            <strong>{course.dept} {course.num} - {course.name}:</strong> {course.reason}
                        </li>
                        ))}
                        
                    </ul>
                </li>
                    <li><strong>Funny/Interesting Item to Remember Me By: </strong> {data.funFact}</li>
                    <li><strong>Addintional: </strong>{data.additional ? `${data.additional}` : ""}</li>
            </ul>
            
            <p id="quote">{data.quote.text}</p>
            <p id="quote">{data.quote.author}</p>
            <p>
            <a href={data.links.charlotte} target="_blank" rel="noopener noreferrer">CLT Web</a> {data.divider}{" "}
            <a href={data.links.github} target="_blank" rel="noopener noreferrer">GitHub</a> {data.divider}{" "}
            <a href={data.links.githubio} target="_blank" rel="noopener noreferrer">GitHub.io</a> {data.divider}{" "}
            <a href={data.links.itis3135} target="_blank" rel="noopener noreferrer">ITIS3135</a> {data.divider}{" "}
            <a href={data.links.freecodecamp} target="_blank" rel="noopener noreferrer">freeCodeCamp</a> {data.divider}{" "}
            <a href={data.links.codecademy} target="_blank" rel="noopener noreferrer">Codecademy</a> {data.divider}{" "}
            <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> 
            </p>
        </article>) )}
        
    </>
    )
    
}*/
import {useState, useEffect} from 'react';

export default function Introductions({ onDataFetched, displayFields, introductions: dataToDisplay }) { // Renamed 'introductions' prop to 'dataToDisplay'

    const [introductions, setIntroductions] = useState(null);
    const [error, setError] = useState(null);

    // Data Fetching Logic (runs only once)
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
            .then((data) => {
                setIntroductions(data);
                // Pass the fetched data up to the parent component
                if (onDataFetched) {
                    onDataFetched(data);
                }
            })
            .catch((error) => setError(error.message));
        }, [onDataFetched]);

        if(error) return <p>Error: {error}</p>
        if(!introductions) return <p>Loading...</p>

    // Use the data passed from the parent component if it exists, otherwise use the locally fetched data
    const introsToRender = dataToDisplay || introductions;

    if (introsToRender.length === 0) return <p>No students found matching the current filters.</p>;

    return(
    <>
        {introsToRender.map((data, index) => (
        <article key={index}>
            <hr/>
            {/* 1. Name and Mascot */}
            {(displayFields.name || displayFields.mascot) && (
                <h3>
                    {displayFields.name && 
                        `${data.name.first} ${data.name.middleInitial ? `${data.name.middleInitial}.` : ""} ${data.name.last}`
                    }
                    {(displayFields.name && displayFields.mascot) ? ` ${data.divider} ` : ""}
                    {displayFields.mascot && data.mascot}
                </h3>
            )}

            {/* 2. Image */}
            {displayFields.image && (
                <figure>
                    <img src={`https://dvonb.xyz${data.media.src}`} width={400} alt={data.media.caption}/>
                    <figcaption>{data.media.caption}</figcaption>
                </figure>
            )}

            {/* 3. Personal Statement */}
            {displayFields.personalStatement && <p>{data.personalStatement}</p>}
            
            {/* 4. Details List (Backgrounds, Classes, Extra Info) */}
            {(displayFields.backgrounds || displayFields.classes || displayFields.extraInformation) && (
                <ul>
                    {/* Backgrounds */}
                    {displayFields.backgrounds && 
                        <>
                        <li><strong>Personal Background: </strong>{data.backgrounds.personal}</li>
                        <li><strong>Professional Background: </strong>{data.backgrounds.professional}</li>
                        <li><strong>Academic Background: </strong>{data.backgrounds.academic}</li>
                        </>
                    }
                    
                    {/* Extra Information */}
                    {displayFields.extraInformation && 
                        <>
                        <li><strong>Primary Computer: </strong>{data.platform.device}, {data.platform.os}</li>
                        <li><strong>Funny/Interesting Item to Remember Me By: </strong> {data.funFact}</li>
                        <li><strong>Additional: </strong>{data.additional ? `${data.additional}` : ""}</li>
                        </>
                    }

                    {/* Classes */}
                    {displayFields.classes && 
                        <li><strong>Courses I'm Taking & Why: </strong>
                            <ul>
                                {data.courses.map((course, courseIndex) => (
                                <li key={courseIndex}>
                                    <strong>{course.dept} {course.num} - {course.name}:</strong> {course.reason}
                                </li>
                                ))}
                            </ul>
                        </li>
                    }
                </ul>
            )}
            
            {/* 5. Quote */}
            {displayFields.quote && 
                <>
                    <p id="quote">{data.quote.text}</p>
                    <p id="quote-author">{data.quote.author}</p>
                </>
            }

            {/* 6. Links */}
            {displayFields.links && (
                <p>
                    <a href={data.links.charlotte} target="_blank" rel="noopener noreferrer">CLT Web</a> {data.divider}{" "}
                    <a href={data.links.github} target="_blank" rel="noopener noreferrer">GitHub</a> {data.divider}{" "}
                    <a href={data.links.githubio} target="_blank" rel="noopener noreferrer">GitHub.io</a> {data.divider}{" "}
                    <a href={data.links.itis3135} target="_blank" rel="noopener noreferrer">ITIS3135</a> {data.divider}{" "}
                    <a href={data.links.freecodecamp} target="_blank" rel="noopener noreferrer">freeCodeCamp</a> {data.divider}{" "}
                    <a href={data.links.codecademy} target="_blank" rel="noopener noreferrer">Codecademy</a> {data.divider}{" "}
                    <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> 
                </p>
            )}
        </article>) )}
        
    </>
    )
    
}