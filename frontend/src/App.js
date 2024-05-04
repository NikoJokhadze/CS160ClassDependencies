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

  const majorClassDependenciesGraph = async () => {
    try {
      const dagData = `digraph G  {

        node [
              fontname="Helvetica,Arial,sans-serif"
              style =filled
          shape =rect
              //color = black
              fillcolor ="#a1f1a1ff";
              ]
        edge[
              fontname = "Helvetica,Arial,sans-serif"
              penwidth = 2 // make the arrow bold
              ]

          // define the node color meaning
          rankdir=TB; //layout format
          // make edges invisible
          Green -> Yellow -> Grey [style=invis];
          Green [label=<<TABLE BORDER="0" CELLBORDER="0">
                <TR><TD><B>Class Taken Already</B></TD></TR>
             </TABLE>>, shape=plaintext, fontsize=9, fillcolor="#a1f1a1ff",pos="-5,1!"];//pos doesn't work


          Yellow [label=<<TABLE BORDER="0" CELLBORDER="0">
                <TR><TD><B>Class In Progress</B></TD></TR>
             </TABLE>>, shape=plaintext, fontsize=9, fillcolor="#f3d40eff"];
          Grey [label=<<TABLE BORDER="0" CELLBORDER="0">
                <TR><TD><B>Class Not Taken Yet</B></TD></TR>
             </TABLE>>, shape=plaintext, fontsize=9, fillcolor="grey"];


          // define the rank of the classes(nodes)
          //take off the "layout=neato", with or without rank: both work
          { rank = same; CS49J; CS46A; }
          { rank = same; CS46B; Math42}
          { rank = same; CS47}
          { rank = same; CS146; CS147; CS154; }

          // define edges and edge colors
          CS49J -> CS46B [color="#048804ff"]
          CS49J -> CS151 [color="#048804ff"]
          CS49J -> CS146 [color="#048804ff"]
          CS49J -> CS175 [color="#048804ff"]

          CS46A -> CS46B [color="#048804ff"]
          CS46A -> CS175 [color="#048804ff"]

          CS46B -> CS47 [color="#048804ff"]
          CS46B -> CS123A [color="#048804ff"]
          CS46B -> CS144 [color="#048804ff"]
          CS46B -> CS146 [color="#048804ff"]
          CS46B -> CS151 [color="#048804ff"]
          CS46B -> CS154 [color="#048804ff"]
          CS46B -> CS174 [color="#048804ff"]
          CS46B -> CS175 [color="#048804ff"]

          CS47 -> CS147 [color="#048804ff"]
          CS47 -> CS149 [color="#048804ff"]
          CS47 -> CS153 [color="red"]
          CS47 -> CS166 [color="#048804ff"]
          CS47 -> CS175 [color="#048804ff"]


          CS146 -> CS116A [color="#048804ff"]
          CS146 -> CS122 [color="red"]
          CS123A -> CS123B [color="red"]
          CS146 -> CS134 [color="#048804ff"]
          CS146 -> CS149 [color="#048804ff"]
          CS146 -> CS153 [color="red"]
          CS146 -> CS155 [color="#048804ff"]
          CS146 -> CS156 [color="red"]
          CS146 -> CS157A [color="#f3d40eff"]
          CS146 -> CS159 [color="red"]
          CS146 -> CS160 [color="#048804ff"]
          CS146 -> CS166 [color="#048804ff"]
          CS146 -> CS171 [color="#048804ff"]
          CS146 -> CS176 [color="#048804ff"]

          CS151 -> CS152 [color="#f3d40eff"]
          CS151 -> CS156 [color="red"]
          CS151 -> CS160 [color="#f3d40eff"]

          CS157A -> CS157B [color="red"]
          CS157B -> CS157C [color="red"]


          CS100W -> CS160 [color="#f3d40eff"]

          Math30 -> Math31 [color="#048804ff"]

          Math31 -> CS116A [color="#048804ff"]
          Math31 -> Math32 [color="#048804ff"]
          Math31 -> Math39 [color="#048804ff"]
          Math31 -> Math142 [color="#048804ff"]
          Math31 -> Math161A [color="#048804ff"]

          Math32 -> Math177 [color="#048804ff"]

          Math39 -> CS116A [color="#048804ff"]
          Math39 -> Math177 [color="#048804ff"]
          Math39 -> Math178 [color="#f3d40eff"]
          Math39 -> Math179 [color="#048804ff"]

          Math42 -> CS47 [color="#048804ff"]
          Math42 -> CS151 [color="#048804ff"]
          Math42 -> CS154 [color="#048804ff"]
          Math42 -> Math142 [color="#048804ff"]
          Math42 -> Math179 [color="#048804ff"]

          Math161A -> Math162 [color="#048804ff"]


          // define the nodes by rank order
          /*BORDER="0" removes the border around the entire table.
          CELLBORDER="1" adds a border around each cell.
          CELLSPACING="0" removes the spacing between cells.
          CELLPADDING="4" adds padding inside each cell.
          TR: table row;
          TD: tabla data/table cell*/

            CS100W [label="CS100W",shape=plaintext,fontsize=9];
            CS100W [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS100W </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS49J [label="CS49J",shape=plaintext,fontsize=9];
            CS49J [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS49J </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];

            CS46A [label="CS46A",shape=plaintext,fontsize=9];
            CS46A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS46A </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];

            CS46B [label="CS46B",shape=plaintext,fontsize=9];
            CS46B [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS46B </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS47 [label="CS47",shape=plaintext,fontsize=9];
            CS47 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS47 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];

            CS116A [label="CS116A",shape=plaintext,fontsize=9];
            CS116A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS116A </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS122 [label="CS122",shape=plaintext,fontsize=9];
            CS122 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS122 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="grey"];
            CS123A [label="CS123A",shape=plaintext,fontsize=9];
            CS123A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS123A </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS123B [label="CS123B",shape=plaintext,fontsize=9];
            CS123B [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS123B </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="grey"];
            CS134 [label="CS134",shape=plaintext,fontsize=9];
            CS134 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS134 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS144 [label="CS144",shape=plaintext,fontsize=9];
            CS144 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS144 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS146 [label="CS146",shape=plaintext,fontsize=9];
            CS146 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS146 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS147 [label="CS147",shape=plaintext,fontsize=9];
            CS147 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS147 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS149 [label="CS149",shape=plaintext,fontsize=9];
            CS149 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS149 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS151 [label="CS151",shape=plaintext,fontsize=9];
            CS151 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS151 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS152 [label="CS152",shape=plaintext,fontsize=9];
            CS152 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS152 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="#f3d40eff"];
            CS153 [label="CS153",shape=plaintext,fontsize=9];
            CS153 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS153 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="grey"];
            CS154 [label="CS154",shape=plaintext,fontsize=9];
            CS154 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS154 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS155 [label="CS155",shape=plaintext,fontsize=9];
            CS155 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS155 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS156 [label="CS156",shape=plaintext,fontsize=9];
            CS156 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS156 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="grey"];

            CS157A [label="CS157A",shape=plaintext,fontsize=9];
            CS157A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS157A </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="#f3d40eff"];
            CS157B [label="CS157B",shape=plaintext,fontsize=9];
            CS157B [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS157B </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, style="filled", fillcolor="grey"];
            CS157C [label="CS157C",shape=plaintext,fontsize=9];
            CS157C [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS157C </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, style="filled", fillcolor="grey"];
            CS159 [label="CS159",shape=plaintext,fontsize=9];
            CS159 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS159 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, style="filled", fillcolor="grey"];
            CS160 [label="CS160",shape=plaintext,fontsize=9];
            CS160 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS160 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="#f3d40eff"];
            CS166 [label="CS166",shape=plaintext,fontsize=9];
            CS166 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS166 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS171 [label="CS171",shape=plaintext,fontsize=9];
            CS171 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS171 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS174 [label="CS174",shape=plaintext,fontsize=9];
            CS174 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS174 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS175 [label="CS175",shape=plaintext,fontsize=9];
            CS175 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS175 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            CS176 [label="CS176",shape=plaintext,fontsize=9];
            CS176 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> CS176 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];

            /*math node*/
            Math30 [label="Math30",shape=plaintext,fontsize=9];
            Math30 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math30 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math31 [label="Math31",shape=plaintext,fontsize=9];
            Math31 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math31 </TD></TR>
                <TR><TD> 4 Units </TD></TR>
                </TABLE>>];
            Math32 [label="Math32",shape=plaintext,fontsize=9];
            Math32 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math32 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math39 [label="Math39",shape=plaintext,fontsize=9];
            Math39 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math39 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math42 [label="Math42",shape=plaintext,fontsize=9];
            Math42 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math42 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math142 [label="Math142",shape=plaintext,fontsize=9];
            Math142 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math142 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math161A [label="Math161A",shape=plaintext,fontsize=9];
            Math161A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math161A </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math162 [label="Math162",shape=plaintext,fontsize=9];
            Math162 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math162 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math177 [label="Math177",shape=plaintext,fontsize=9];
            Math177 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math177 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
            Math178 [label="Math178",shape=plaintext,fontsize=9];
            Math178 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math178 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>, fillcolor="#f3d40eff"];
            Math179 [label="Math179",shape=plaintext,fontsize=9];
            Math179 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
                <TR><TD> Math179 </TD></TR>
                <TR><TD> 3 Units </TD></TR>
                </TABLE>>];
      }`;
      setDag(dagData);
    } catch (error) {
      console.error('Error displaying class dependencies graph:', error);
    }
  };

  const callMiddlewareAPI = async () => {
    try {
      const response = await fetch('http://localhost:5001/sample');
      const data = await response.text();

      const dagData = data;
      setDag(dagData);
    } catch (error) {
      console.error('Error fetching major graphviz data:', error);
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

        <button onClick={majorClassDependenciesGraph}>Major Class Dependency Graph</button>

        <button onClick={callMiddlewareAPI}>Call Middleware API</button>
        {message && (
          <div>
            <p>{message}</p>
            <textarea
              rows={4}
              cols={50}
              value={responseText}
              onChange={handleResponseChange}
              readOnly
            />
          </div>
        )}

        <textarea value={dag} onChange={(e) => setDag(e.target.value)}></textarea>
      <DAGViewer dot={dag} height="100vh" />
      </header>
    </div>
  );

}

export default App;

