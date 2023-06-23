import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import WikiEdit from './pages/WikiEdit';

function App() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wikiedit" element={<WikiEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
