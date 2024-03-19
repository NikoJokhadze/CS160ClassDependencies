import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
 
  // Function to handle button click
  const handleClick = () => {
    console.log('Button clicked!');
    // Add your desired action here
  };
  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');

  const callMiddlewareAPI = async () => {
    try {
      const response = await fetch('http://localhost:5001/hello');
      const data = await response.json();
      setMessage(data.message);
      setResponseText(data.message); // Set response text when API call is returned
    } catch (error) {
      console.error('Error fetching middleware API:', error);
    }
  };

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  return (
    
    <div className="App">

      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>Edit <code>src/App.js</code> and save to reload.</p>*/}
        <h1>MajorView</h1>

        <button className="button">Home</button>
        {/*link "Major Class Dependency Graph" button to a PNG file*/}
        {/*target="_blank" Attribute: Adding target="_blank":the link opens in a new tab.*/}
        {/*rel="noopener noreferrer" Attribute: Adding rel="noopener noreferrer" : 
        opening links in a new tab/window to prevent potential security vulnerabilities.*/}
        <a href = "lowversion.png" target = "_blank" rel="noopener noreferrer">
        <button className="button">Major Class Dependency Graph</button>
        </a>
        <button className="button">Suggested Classes</button>
        {/*<button className="button">Call Middleware API</button>*/}
        

        {/*<button onClick={handleClick}>Home</button>
        <button onClick={handleClick}>Major Class Dependency Grap</button>
        <button onClick={handleClick}>Suggested Classes</button>*/}
        <button onClick={callMiddlewareAPI}>Call Middleware API</button>
        {message && <p>{message}</p>}
        {/* Display text box with the response */}
        {responseText && (
          <div>
            <textarea
              rows={4}
              cols={50}
              value={responseText}
              onChange={handleResponseChange}
              readOnly
            />
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  
}

export default App;




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
