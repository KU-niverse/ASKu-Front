import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import WikiEdit from './pages/WikiEdit';
import WikiCreate from './pages/WikiCreate';
import Signin from './pages/Signin';

function App() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wikiedit" element={<WikiEdit />} />
                <Route path="/newwiki" element={<WikiCreate />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </Router>
    );
}

export default App;
