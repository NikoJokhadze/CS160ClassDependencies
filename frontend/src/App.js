import React, { useState } from 'react';
import './App.css';
import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import MajorGraph from "./pages/MajorGraph";
import PersonalGraph from "./pages/PersonalGraph";
import DAGViewer from "./DAGViewer";
import { Route, Routes } from "react-router-dom";



function App() {
  // Function to handle button click, can add functionality if desired
  const handleClick = () => {
    console.log('Button clicked!');
  };

  // List of various useState variables
  const [major, setMajor] = useState('');
  const [majorText, setMajorText] = useState('');
  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');
  const [dag, setDag] = useState(``)
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

  // Functions for button functionality
   const suggestedClasses = async () => {
    try {
      setShowAdditionalButtons(true); // Show additional detail buttons after fetching suggested classes
    } catch (error) {
      console.error('Error displaying buttons:', error);
    }
  };

  const handleLowDetailClick = async () => {
    try {
      const response = await fetch('http://localhost:5001/major/7663?detaillevel=low');
      const data = await response.text();

      const dagData = data;
      setDag(dagData);
      setShowAdditionalButtons(true); // Show additional detail buttons after fetching suggested classes
    } catch (error) {
      console.error('Error fetching major graphviz data:', error);
    }
  };

  const handleMediumDetailClick = async () => {
    try {
      const response = await fetch('http://localhost:5001/major/7663?detaillevel=medium');
      const data = await response.text();

      const dagData = data;
      setDag(dagData);
      setShowAdditionalButtons(true); // Show additional detail buttons after fetching suggested classes
    } catch (error) {
      console.error('Error fetching major graphviz data:', error);
    }
  };

  const handleMaximumDetailClick = async () => {
    try {
      const response = await fetch('http://localhost:5001/major/7663?detaillevel=high');
      const data = await response.text();

      const dagData = data;
      setDag(dagData);
      setShowAdditionalButtons(true); // Show additional detail buttons after fetching suggested classes
    } catch (error) {
      console.error('Error fetching major graphviz data:', error);
    }
  };

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleMajorChange = (event) => {
    setMajorText(event.target.value);
  };
 
  
  return (
  
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/majorGraph" element={<MajorGraph />}/>
        <Route path="/personalGraph" element={<PersonalGraph />}/>
      </Routes>

      <header className="App-header">
        <button onClick={suggestedClasses}>Suggested Classes</button>
        {/* Conditionally render additional buttons */}
        {showAdditionalButtons && (
          <div>
            <button onClick={handleLowDetailClick}>Low Detail</button>
            <button onClick={handleMediumDetailClick}>Medium Detail</button>
            <button onClick={handleMaximumDetailClick}>Maximum Detail</button>
          </div>
        )}

        {major && (
          <div>
            <p>{major}</p>
            <textarea
              rows={4}
              cols={50}
              value={majorText}
              onChange={handleMajorChange}
              readOnly
            />
          </div>
        )}
      <DAGViewer dot={dag} height="100vh" />
      </header>
    </div>
  );

}

export default App;

