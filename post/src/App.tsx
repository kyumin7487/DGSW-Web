import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "../src/pages/main/index";
import Sub from "../src/pages/sub/index";
import Write from "../src/pages/write/index";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/sub/:idx" element={<Sub />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </Router>
    );
}

export default App;
