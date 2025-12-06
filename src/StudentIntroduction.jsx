/*export default function StudentIntroduction({studentData, displayName, displayMascot, displayImage}){
    return <article>
                    <h3>
                        {
                            displayName &&
                            `${studentData.name.first} ${" "}
                            ${studentData.name.middleInitial ? studentData.name.middleInitial + ". " : ""} ${" "}
                            ${studentData.name.preferred ? '"' + studentData.name.preferred + '" ' : ""} ${" "}
                            ${studentData.name.last} ${" "}`
                        }
                        {displayName && displayMascot && studentData.divider} {" "}
                        {displayMascot && studentData.mascot}
                    </h3>
                    {
                        displayImage ? // If displayImage is true display the figure element
                        (
                        <figure>
                            <img src={"https://dvonb.xyz" + studentData.media.src} width={300} />
                            <figcaption>{studentData.media.caption}</figcaption>
                        </figure>
                        ) : "" // This makes it do nothing
                    }
                    <p>{studentData.personalStatement}</p>
                    <ul>
                        <li><strong>Personal Background: </strong>{studentData.backgrounds.personal}</li>
                        <li><strong>Professional Background: </strong>{studentData.backgrounds.professional}</li>
                        <li><strong>Academic Background: </strong>{studentData.backgrounds.academic}</li>
                        <li><strong>Subject Background: </strong>{studentData.backgrounds.subject}</li>
                        <li>
                            <strong>Computer: </strong> {studentData.platform.device} ({studentData.platform.os})
                        </li>
                        <li>
                            <strong>Courses:</strong>
                            <ol>
                                {
                                    studentData.courses.map((course, index) =>
                                        <li key={index}>
                                            <strong>{course.dept} {course.num} - {course.name}</strong> : {course.reason}
                                        </li>
                                    )
                                }
                            </ol>
                        </li>
                        <li>
                            <strong>Fun Fact: </strong> {studentData.funFact}
                        </li>
                        <li>
                            <strong>Additional Information: </strong> {studentData.additional}
                        </li>
                    </ul>
                    <p>
                        <em>{studentData.quote.text}</em>
                        <br />
                        - {studentData.quote.author}
                    </p>
                    <a href={studentData.links.charlotte}>CLT Web</a> <a href={studentData.links.github}>GitHub Profile</a> <a href="">GitHub Pages</a>
                    <hr />
                </article>
}*/
function StudentIntroduction({studentData, filterState}){
    // Ensure studentData exists before trying to access its properties
    if (!studentData) return <p>Student data is missing.</p>;

    return (
        <article>
            {/* Name, Mascot */}
            {filterState.name && filterState.mascot ? (
                // Displaying both Name and Mascot
                <h3>
                    {`${studentData.name.first} ${" "}
                    ${studentData.name.middleInitial ? studentData.name.middleInitial + ". " : ""} ${" "}
                    ${studentData.name.preferred ? '"' + studentData.name.preferred + '" ' : ""} ${" "}
                    ${studentData.name.last} ${" "}
                    ${studentData.divider} ${" "}
                    ${studentData.mascot}`}
                </h3>
            ) : filterState.name ? (
                // Only Name
                 <h3>
                    {`${studentData.name.first} ${" "}
                    ${studentData.name.middleInitial ? studentData.name.middleInitial + ". " : ""} ${" "}
                    ${studentData.name.preferred ? '"' + studentData.name.preferred + '" ' : ""} ${" "}
                    ${studentData.name.last}`}
                </h3>
            ) : filterState.mascot ? (
                // Only Mascot
                <h3>{studentData.mascot}</h3>
            ) : null}

            {/* Image */}
            {filterState.image && (
                <figure>
                    <img src={"https://dvonb.xyz" + studentData.media.src} width={400} alt={studentData.media.caption} />
                    <figcaption>{studentData.media.caption}</figcaption>
                </figure>
            )}

            {/* Personal Statement */}
            {filterState.personalStatement && <p>{studentData.personalStatement}</p>}

            {/* Details List (Backgrounds, Classes, Extra Info) */}
            {(filterState.backgrounds || filterState.classes || filterState.extraInfo) && (
                <ul>
                    {/* Backgrounds */}
                    {filterState.backgrounds && (
                        <>
                            <li><strong>Personal Background: </strong>{studentData.backgrounds.personal}</li>
                            <li><strong>Professional Background: </strong>{studentData.backgrounds.professional}</li>
                            <li><strong>Academic Background: </strong>{studentData.backgrounds.academic}</li>
                            <li><strong>Subject Background: </strong>{studentData.backgrounds.subject}</li>
                        </>
                    )}

                    {/* Classes */}
                    {filterState.classes && (
                        <li>
                            <strong>Courses I'm Taking & Why: </strong>
                            <ol>
                                {
                                    studentData.courses.map((course, index) =>
                                        <li key={index}>
                                            <strong>{course.dept} {course.num} - {course.name}</strong>: {course.reason}
                                        </li>
                                    )
                                }
                            </ol>
                        </li>
                    )}

                    {/* Extra Information (Computer, Fun Fact, Additional) */}
                    {filterState.extraInfo && (
                        <>
                            <li>
                                <strong>Primary Computer: </strong> {studentData.platform.device} ({studentData.platform.os})
                            </li>
                            <li>
                                <strong>Funny/Interesting Item to Remember Me By: </strong> {studentData.funFact}
                            </li>
                            {studentData.additional && (
                                <li>
                                    <strong>Additional: </strong>{studentData.additional}
                                </li>
                            )}
                        </>
                    )}
                </ul>
            )}

            {/* Quote */}
            {filterState.quote && (
                <p>
                    <em id="quote">{studentData.quote.text}</em>
                    <br />
                    <span id="quote-author">- {studentData.quote.author}</span>
                </p>
            )}

            {/* Links */}
            {filterState.links && (
                <p>
                    <a href={studentData.links.charlotte} target="_blank" rel="noopener noreferrer">CLT Web</a> {studentData.divider}{" "}
                    <a href={studentData.links.github} target="_blank" rel="noopener noreferrer">GitHub</a> {studentData.divider}{" "}
                    <a href={studentData.links.githubio} target="_blank" rel="noopener noreferrer">GitHub.io</a> {studentData.divider}{" "}
                    <a href={studentData.links.itis3135} target="_blank" rel="noopener noreferrer">ITIS3135</a> {studentData.divider}{" "}
                    <a href={studentData.links.freecodecamp} target="_blank" rel="noopener noreferrer">freeCodeCamp</a> {studentData.divider}{" "}
                    <a href={studentData.links.codecademy} target="_blank" rel="noopener noreferrer">Codecademy</a> {studentData.divider}{" "}
                    <a href={studentData.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
            )}
            
            <hr />
        </article>
    );
}