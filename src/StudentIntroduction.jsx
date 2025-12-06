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
