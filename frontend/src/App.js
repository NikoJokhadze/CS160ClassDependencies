import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import DAGViewer from "./DAGViewer";


function App() {
  // Function to handle button click
  const handleClick = () => {
    console.log('Button clicked!');
    // Add your desired action here
  };

  const [major, setMajor] = useState('');
  const [majorText, setMajorText] = useState('');

  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');

  const [dag, setDag] = useState(``)

  const suggestedClasses = async () => {
    try {
      const response = await fetch('http://localhost:5001/sample');
      const data = await response.text();

      const dagData = data;
      setDag(dagData);
    } catch (error) {
      console.error('Error fetching major graphviz data:', error);
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
      const response = await fetch('http://localhost:5001/database');
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

  const handleMajorChange = (event) => {
    setMajorText(event.target.value);
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
        {/*<button className="button">Major Class Dependency Graph</button>*/}
        </a>
        {/*<button className="button">Suggested Classes</button>*/}
        {/*<button className="button">Call Middleware API</button>*/}


        {/*<button onClick={handleClick}>Home</button>*/}
        <button onClick={suggestedClasses}>Suggested Classes</button>
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

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <textarea value={dag} onChange={(e) => setDag(e.target.value)}></textarea>
      <DAGViewer dot={dag} height="100vh" />
      </header>
    </div>
  );

}

export default App;




// Legacy Data from Graphviz code block. Delete later:
/*# http://www.graphviz.org/content/cluster

      digraph {
        // Base Styling
        rankdir="TB";
        splines=true;
        overlap=false;
        nodesep="0.2";
        ranksep="0.4";
        label="Attack Tree for S3 Bucket with Video Recordings";
        labelloc="t";
        fontname="Lato";
        node [ shape="plaintext" style="filled, rounded" fontname="Lato" margin=0.2 ]
        edge [ fontname="Lato" color="#2B303A" ]

        // List of Nodes

        // base nodes
        reality [ label="Reality" fillcolor="#2B303A" fontcolor="#ffffff" ]
        attack_win [ label="Access video\nrecordings in\nS3 bucket\n(attackers win)" fillcolor="#DB2955" fontcolor="#ffffff" ]

          // attack nodes
          node [ color="#ED96AC" ]
        attack_1 [ label="API cache\n(e.g. Wayback\nMachine)" color="#C6CCD2" ]
        attack_2 [ label="AWS public\nbuckets search" ]
        attack_3 [ label="S3 bucket\nset to public" color="#C6CCD2" ]
        attack_4 [ label="Brute force" ]
        attack_5 [ label="Phishing" ]
        attack_6 [ label="Compromise\nuser credentials" ]
        attack_7 [ label="Subsystem with\naccess to\nbucket data" color="#C6CCD2" ]
        attack_8 [ label="Manually analyze\nweb client for access\ncontrol misconfig" ]
        attack_9 [ label="Compromise\nadmin creds" ]
        attack_10 [ label="Intercept 2FA" ]
        attack_11 [ label="SSH to an\naccessible\nmachine" ]
        attack_12 [ label="Lateral movement to\nmachine with access\nto target bucket" ]
        attack_13 [ label="Compromise\nAWS admin creds" ]
        attack_14 [ label="Compromise\npresigned URLs" ]
        attack_15 [ label="Compromise\nURL within N\ntime period" ]
        attack_16 [ label="Recon on S3 buckets" ]
        attack_17 [ label="Find systems with\nR/W access to\ntarget bucket" ]
        attack_18 [ label="Exploit known 3rd\nparty library vulns" ]
        attack_19 [ label="Manual discovery\nof 0day" ]
        attack_20 [ label="Buy 0day" ]
        attack_21 [ label="Exploit vulns" ]
        attack_22 [ label="0day in AWS\nmultitenant systems" ]
        attack_23 [ label="Supply chain\ncompromise\n(backdoor)" ]

        // defense nodes
        node [ color="#ABD2FA" ]
        defense_1 [ label="Disallow\ncrawling\non site maps" ]
        defense_2 [ label="Auth required / ACLs\n(private bucket)" ]
        defense_3 [ label="Lock down\nweb client with\ncreds / ACLs" ]
        defense_4 [ label="Perform all access\ncontrol server-side" ]
        defense_5 [ label="2FA" ]
        defense_6 [ label="IP allowlist for SSH" ]
        defense_7 [ label="Make URL\nshort lived" ]
        defense_8 [ label="Disallow the use\nof URLs to\naccess buckets" ]
        defense_9 [ label="No public system\nhas R/W access\n(internal only)" ]
        defense_10 [ label="3rd party library\nchecking / vuln\nscanning" ]
        defense_11 [ label="Exploit prevention\n/ detection" ]
        defense_12 [ label="Use single tenant\nAWS HSM" ]

        // List of Edges

        // branch 1 edges
        // this starts from the reality node and connects with the first "attack",
        // which is really just taking advantage of #yolosec (big oof)
        reality -> attack_1 [ xlabel="#yolosec" fontcolor="#DB2955" ]
        attack_1 -> attack_win

        // branch 2 edges
        // this connects the reality node to the first mitigation,
        // which helps avoid the #yolosec path from branch 1
        reality -> defense_1
        defense_1 -> attack_2
        attack_2 -> attack_3 [ xlabel="#yolosec" fontcolor="#DB2955" ]
        attack_3 -> attack_win

        // branch 3 edges
        // this connects the reality node to another mitigation,
        // which helps avoid the #yolosec path from branch 2
        reality -> defense_2
        defense_2 -> attack_4
        defense_2 -> attack_5
        attack_4 -> attack_6
        attack_5 -> attack_6
        attack_6 -> attack_7
        attack_7 -> attack_win
        // potential mitigation path
        attack_7 -> defense_3
        defense_3 -> attack_8
        attack_8 -> attack_win
        // potential mitigation path
        attack_8 -> defense_4
        defense_4 -> attack_5 [ style="dashed" color="#7692FF" ]

        // branch 4 edges
        // this starts from the last mitigation loop vs. the reality node
        attack_5 -> attack_9
        attack_9 -> attack_11 [ xlabel="#yolosec" fontcolor="#DB2955" ]
        // potential mitigation path
        attack_9 -> defense_5
        defense_5 -> attack_10
        attack_10 -> attack_11
        // potential mitigation path
        attack_11 -> defense_6
        defense_6 -> attack_12
        attack_12 -> attack_win

        // branch 5 edges
        // this also represents a branch from the prior mitigation loop
        // but it is more difficult than branch 4, hence comes after
        // the new attack step allows attackers to skip some steps on branch 4
        // so it links back to branch 4, whose edges are already defined
        attack_5 -> attack_13
        attack_13 -> attack_11
        attack_13 -> defense_5

        // branch 6 edges
        // depending on the mitigations, the initial node allows for different outcomes
        // this also represents a branch from the prior mitigation loop
        // it is more difficult than branch 4 and branch 5, hence comes after
        attack_5 -> attack_14
        attack_14 -> attack_win
        attack_14 -> attack_15
        // potential mitigation path
        attack_14 -> defense_7
        defense_7 -> attack_15
        attack_15 -> attack_win
        // potential mitigation path
        attack_15 -> defense_8

        // branch 7 edges
        // a new loop is born!
        // the first edges tie prior mitigations to the new attack step
        defense_2 -> attack_16
        defense_5 -> attack_16 [ style="dashed" color="#7692FF" ]
        defense_8 -> attack_16 [ style="dashed" color="#7692FF" ]
        attack_16 -> attack_17 [ xlabel="#yolosec" fontcolor="#DB2955" ]
        // potential mitigation path
        attack_17 -> defense_9
        defense_9 -> attack_5 [ style="dashed" color="#7692FF" ]
        attack_17 -> attack_18
        // potential mitigation path
        attack_18 -> defense_10

        // branch 8 edges
        // we've reached the last path!
        // this is the most expensive one for attackers.
        // these attacks are definitely uncommon...
        // ...because attackers will be cheap / lazy if they can be.
        // these edges start from the last mitigation from branch 7
        defense_10 -> attack_19
        defense_10 -> attack_20
        attack_19 -> attack_21
        attack_20 -> attack_21
        attack_21 -> attack_win
        // potential mitigation path
        attack_21 -> defense_11
        defense_11 -> attack_22
        attack_22 -> attack_win
        // potential mitigation path
        // for the purposes of illustration, this path represents a mitigation
        // that isn't actually implemented yet -- hence a dotted edge
        attack_22 -> defense_12 [ style="dotted" ]
        defense_12 -> attack_23
        attack_23 -> attack_win

        // Subgraphs / Clusters

        // these clusters enforce the correct hierarchies
        subgraph initialstates {
            rank=same;
            attack_1;
            defense_1;
            defense_2;
          }
        subgraph authrequired {
            rank=same;
            attack_4;
            attack_5;
            attack_16;
          }
          subgraph phishcluster {
            rank=same;
            attack_6;
            attack_9;
            attack_13;
            attack_14;
            rankdir=LR;
          }
          // these invisible edges are to enforce the correct left-to-right order
          // based on the level of attack difficulty
          attack_6 -> attack_9 -> attack_13 -> attack_14 [ style="invis" ]
      }*/

//____________________________________________________________________

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