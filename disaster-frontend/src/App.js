import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Alerts from "./pages/Alerts";
import Resources from "./pages/Resources";
import CoordinationPage from "./pages/Coordination";
import Volunteer from "./pages/Volunteer";
import AskAI from "./pages/AskAI"; // Ensure this is imported

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/inventory" element={<Resources />} />
        <Route path="/coordination" element={<CoordinationPage />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/ask-ai" element={<AskAI />} />
      </Routes>
    </Router>
  );
}

export default App;
