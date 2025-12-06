import { useStare, useEffect, useCallback } from 'react';
import './App.css';
import Introductions from './Introductions';
export default function FilterIntros() {
    const [allStudents, setAllStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    // 2. Filter/Search State
    const [searchTerm, setSearchTerm] = useState('');

    // 3. Display Fields State (Checkboxes)
    const [displayFields, setDisplayFields] = useState({
        name: true,
        mascot: true,
        image: true,
        personalStatement: true,
        backgrounds: true,
        classes: true,
        extraInformation: true, // Computer, Fun Fact, etc.
        quote: true,
        links: true,
    });

    // 4. Slideshow State
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isSlideshowMode, setIsSlideshowMode] = useState(false);

    // Callback to receive data from the Introductions component
    const handleDataFetched = useCallback((data) => {
        setAllStudents(data);
        setFilteredStudents(data); // Initially, all students are filtered students
    }, []);

    // Effect to handle filtering when allStudents or searchTerm changes
    useEffect(() => {
        const lowerCaseSearch = searchTerm.toLowerCase().trim();

        if (allStudents.length > 0) {
            const results = allStudents.filter(student => {
                const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
                return fullName.includes(lowerCaseSearch);
            });
            setFilteredStudents(results);
            // Reset slideshow index when filters change
            setCurrentSlideIndex(0);
        }
    }, [allStudents, searchTerm]);

    // Handler for Checkbox changes
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setDisplayFields(prev => ({ ...prev, [name]: checked }));
    };

    // Handlers for Slideshow navigation
    const nextSlide = () => {
        setCurrentSlideIndex(prev => 
            (prev === filteredStudents.length - 1) ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlideIndex(prev => 
            (prev === 0) ? filteredStudents.length - 1 : prev - 1
        );
    };

    // Determine what data to pass to the Introductions component based on the mode
    const introsToRender = isSlideshowMode && filteredStudents.length > 0
        ? [filteredStudents[currentSlideIndex]] // Show only the current slide
        : filteredStudents; // Show all filtered students

    // Get the name of the current student for the slideshow
    const currentStudentName = isSlideshowMode && filteredStudents[currentSlideIndex]
        ? `${filteredStudents[currentSlideIndex].name.first} ${filteredStudents[currentSlideIndex].name.last}`
        : '';
        

    return (
        <div className="filter-intros-container">
            <h1>Student Introductions Viewer</h1>
            <hr/>

            <section id="controls">
                <h2>🔎 Search and Display Controls</h2>
                
                {/* 1. Student Counter */}
                <p>
                    Students Found: <strong>{filteredStudents.length}</strong> 
                    {allStudents.length > 0 && ` (out of ${allStudents.length} total)`}
                </p>
                <hr/>

                {/* 2. Search Input */}
                <div className="search-box">
                    <label htmlFor="student-search">Search by Name:</label>
                    <input
                        id="student-search"
                        type="text"
                        placeholder="Enter first or last name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <hr/>
                
                {/* 3. Checkboxes */}
                <h3>Display Fields:</h3>
                <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {Object.keys(displayFields).map(key => (
                        <div key={key}>
                            <input
                                type="checkbox"
                                id={key}
                                name={key}
                                checked={displayFields[key]}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={key} style={{marginLeft: '5px'}}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        </div>
                    ))}
                </div>
                <hr/>

                {/* 4. Slideshow Toggle and Controls */}
                <div className="slideshow-controls">
                    <h3>Slideshow Mode</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={isSlideshowMode}
                            onChange={(e) => setIsSlideshowMode(e.target.checked)}
                        />
                        Enable Slideshow (Only shows one student at a time)
                    </label>

                    {isSlideshowMode && filteredStudents.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={prevSlide} style={{ marginRight: '10px' }}>&larr; Previous</button>
                            <button onClick={nextSlide}>Next &rarr;</button>
                            <p style={{ marginTop: '10px' }}>
                                Currently viewing: <strong>{currentSlideIndex + 1} / {filteredStudents.length}</strong> - {currentStudentName}
                            </p>
                        </div>
                    )}
                    {isSlideshowMode && filteredStudents.length === 0 && <p>No students to display in slideshow mode.</p>}
                </div>
            </section>
            
            <hr/>

            {/* Render the Introductions component with the filtered data and display options */}
            <section id="introductions-list">
                <Introductions 
                    onDataFetched={handleDataFetched}
                    introductions={introsToRender}
                    displayFields={displayFields}
                />
            </section>
        </div>
    );
}