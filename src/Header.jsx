import { Link } from 'react-router';

export default function Header() {
    return <><header>
<h1>Kacey Stocks Knowledgable Seal || ITIS3135</h1>
        <nav>
            <Link to="./">Home</Link>
            ||
            <Link to="/introduction">Introduction</Link>
            ||
            <Link to="/contract">Contract</Link>
            
        </nav>
        <br></br>
        <nav>
            <Link to="https://webpages.charlotte.edu/kstocks3/itis3135/mascotcompany/index.html" target="_blank">Mascot Company</Link> || 
            <Link to="https://webpages.charlotte.edu/kstocks3/itis3135/stuff/CRAP!$web%20site.htm" target="_blank">CRAPPY Webpage</Link> ||
            <Link to="https://webpages.charlotte.edu/kstocks3/itis3135/hobby/index.html" target="_blank">Hobby</Link> ||
            <Link to="https://webpages.charlotte.edu/kstocks3/itis3135/project/index.html" target="_blank">Client Project</Link>
        </nav>
    </header>
    </>
}