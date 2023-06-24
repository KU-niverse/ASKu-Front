import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="pageWrap">
            <Header />
            <Footer />
        </div>
    )
}

export default Home;