import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
