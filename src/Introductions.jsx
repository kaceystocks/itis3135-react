import './App.css'
import {useState, useEffect, useMemo} from 'react';
import StudentIntroduction from './StudentIntroduction';

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
export default function Introductions() {
    const [allIntroductions, setAllIntroductions] = useState(null); // Stores all fetched data
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState({
        name: true,
        mascot: true,
        image: true,
        personalStatement: true,
        backgrounds: true,
        classes: true,
        extraInfo: true, // Grouping Computer, Fun Fact, etc.
        quote: true,
        links: true,
    });
    const [slideshowIndex, setSlideshowIndex] = useState(0);

    // --- Data Fetching Effect ---
    useEffect(
        () => {
            fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else{
                    // Throw an error if the network response is not OK (e.g., 404, 500)
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
            })
            .then((data) => setAllIntroductions(data))
            .catch((error) => setError(error.message));
        }, []);

    // --- Derived State (Filtered/Searched Introductions) ---
    // Use useMemo to re-calculate the filtered list only when allIntroductions or searchTerm changes.
    const filteredIntroductions = useMemo(() => {
        if (!allIntroductions) return [];

        // 1. Apply Search Filter
        const searchFiltered = allIntroductions.filter(student => {
            // Create a full name string to search against
            const fullName = `${student.name.first} ${student.name.middleInitial || ''} ${student.name.last}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase().trim());
        });

        // 2. The filtered list is the one used for the slideshow
        return searchFiltered;
    }, [allIntroductions, searchTerm]);

    // --- Slideshow Logic ---
    const totalStudentsFound = filteredIntroductions.length;

    // Functions to navigate the slideshow
    const nextStudent = () => {
        if (totalStudentsFound > 0) {
            setSlideshowIndex((prevIndex) => (prevIndex + 1) % totalStudentsFound);
        }
    };

    const prevStudent = () => {
        if (totalStudentsFound > 0) {
            setSlideshowIndex((prevIndex) => (prevIndex - 1 + totalStudentsFound) % totalStudentsFound);
        }
    };

    // Reset slideshow index when the filtered list changes (e.g., after searching)
    useEffect(() => {
        setSlideshowIndex(0);
    }, [filteredIntroductions]);

    // --- Handlers ---

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilterState(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    // --- Loading & Error Handling UI ---
    if(error) return <h1>🚨 Error: {error}</h1>
    if(!allIntroductions) return <h1>⏳ Loading student data...</h1>

    // --- Component Render ---
    return(
        <>
            <h1>📚 Student Introductions</h1>
            
            <hr/>

            {/* --- Search and Counter Section --- */}
            <section className="search-section">
                <h2>🔎 Find and Filter Students</h2>
                <input
                    type="text"
                    placeholder="Search by student name (First or Last)"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '300px', padding: '10px' }}
                />
                <p>
                    **Students Found:** **{totalStudentsFound}**
                </p>
            </section>

            <hr/>

            {/* --- Filtering Checkboxes Section --- */}
            <section className="filter-section">
                <h2>⚙️ Display Filters (Checkboxes)</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {Object.keys(filterState).map(key => (
                        <label key={key} style={{ display: 'block' }}>
                            <input
                                type="checkbox"
                                name={key}
                                checked={filterState[key]}
                                onChange={handleFilterChange}
                            />
                            {/* Convert camelCase to Title Case for better display */}
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                    ))}
                </div>
            </section>

            <hr/>

            {/* --- Slideshow Section --- */}
            <section className="slideshow-section">
                <h2>🎥 Student Slideshow</h2>
                {totalStudentsFound > 0 ? (
                    <>
                        <div className="slideshow-controls" style={{ marginBottom: '15px' }}>
                            <button onClick={prevStudent} disabled={totalStudentsFound <= 1}>&lt; Previous</button>
                            <span style={{ margin: '0 15px' }}>
                                Student {slideshowIndex + 1} of {totalStudentsFound}
                            </span>
                            <button onClick={nextStudent} disabled={totalStudentsFound <= 1}>Next &gt;</button>
                        </div>
                        {/* Display the current student in the slideshow */}
                        <StudentIntroduction 
                            studentData={filteredIntroductions[slideshowIndex]} 
                            filterState={filterState}
                        />
                    </>
                ) : (
                    <p>No students match your search criteria.</p>
                )}
            </section>
        </>
    )
    
}