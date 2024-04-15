// GraphGenerator.js
import React from "react";
import { Graphviz } from "graphviz-react";

const dotContent = `
    digraph G  {
    
        
        
        
      fontname="Helvetica,Arial,sans-serif"
        
      node [
            fontname="Helvetica,Arial,sans-serif" 
            shape=plaintext
            style =filled
        shape =rect
            //color = black
            fillcolor ="#a1f1a1ff";
            ]
      edge[
            fontname = "Helvetica,Arial,sans-serif"
            penwidth = 2 // make the arrow bold
            ]
      //layout=neato
      //center=""
      //node[width=.25,height=.375,fontsize=9]
    
    
        // define the rank of the classes(nodes)
        //take off the "layout=neato", with or without rank: both work
        { rank = same; CS49J; CS46A; }
        { rank = same; CS46B; Math42}
        { rank = same; CS47}
        { rank = same; CS146; CS147; CS154; }
    
        // define edges and edge colors
        CS49J -> CS46B [color="#044f04ff"]
        CS49J -> CS151 [color="green"]
        CS49J -> CS146 [color="green"]
        CS49J -> CS175 [color="green"]
    
        CS46A -> CS46B [color="green"]
        CS46A -> CS175 [color="green"]
        
        CS46B -> CS47 [color="green"]
        CS46B -> CS123A [color="green"]
        CS46B -> CS144 [color="green"]
        CS46B -> CS146 [color="green"]
        CS46B -> CS151 [color="green"]
        CS46B -> CS154 [color="green"]
        CS46B -> CS174 [color="green"]
        CS46B -> CS175 [color="green"]
    
        CS47 -> CS147 [color="green"]
        CS47 -> CS149 [color="green"]
        CS47 -> CS153 [color="green"]
        CS47 -> CS166 [color="green"]
        CS47 -> CS175 [color="green"]
    
        
        CS146 -> CS116A [color="green"]
        CS146 -> CS122 [color="green"]
        CS146 -> CS123B [color="green"]
        CS146 -> CS134 [color="green"]
        CS146 -> CS149 [color="green"]
        CS146 -> CS153 [color="green"]
        CS146 -> CS155 [color="green"]
        CS146 -> CS156 [color="green"]
        CS146 -> CS157A [color="green"]
        CS146 -> CS159 [color="green"]
        CS146 -> CS160 [color="green"]
        CS146 -> CS166 [color="green"]
        CS146 -> CS171 [color="green"]
        CS146 -> CS176 [color="green"]
    
        CS151 -> CS152 [color="green"]
        CS151 -> CS156 [color="green"]
        CS151 -> CS160 [color="green"]
    
        CS157A -> CS157B [color="green"]
        CS157B -> CS157C [color="green"]
        
    
        CS100W -> CS160 [color="green"]
        
        Math30 -> Math31 [color="green"]
        
        Math31 -> CS116A [color="green"]
        Math31 -> Math32 [color="green"]
        Math31 -> Math39 [color="green"]
        Math31 -> Math142 [color="green"]
        Math31 -> Math161A [color="green"]
    
        Math32 -> Math177 [color="green"]
    
        Math39 -> CS116A [color="green"]
        Math39 -> Math177 [color="green"]
        Math39 -> Math178 [color="green"]
        Math39 -> Math179 [color="green"]
    
        Math42 -> CS47 [color="green"]
        Math42 -> CS151 [color="green"]
        Math42 -> CS154 [color="green"]
        Math42 -> Math142 [color="green"]
        Math42 -> Math179 [color="green"]
    
        Math161A -> Math162 [color="green"]
        
      
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
              </TABLE>>];
          CS123A [label="CS123A",shape=plaintext,fontsize=9];
          CS123A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS123A </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
          CS123B [label="CS123B",shape=plaintext,fontsize=9];
          CS123B [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS123B </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
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
              </TABLE>>];
          CS153 [label="CS153",shape=plaintext,fontsize=9];
          CS153 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS153 </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
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
              </TABLE>>];
          
          CS157A [label="CS157A",shape=plaintext,fontsize=9];
          CS157A [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS157A </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
          CS157B [label="CS157B",shape=plaintext,fontsize=9];
          CS157B [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS157B </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
          CS157C [label="CS157C",shape=plaintext,fontsize=9];
          CS157C [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS157C </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
          CS159 [label="CS159",shape=plaintext,fontsize=9];
          CS159 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS159 </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
          CS160 [label="CS160",shape=plaintext,fontsize=9];
          CS160 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> CS160 </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
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
              </TABLE>>];
          Math179 [label="Math179",shape=plaintext,fontsize=9];
          Math179 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
              <TR><TD> Math179 </TD></TR> 
              <TR><TD> 3 Units </TD></TR>
              </TABLE>>];
  }  
`;


const GraphGenerator = () => {
  return <Graphviz dot={dotContent} options={{ width: 1200, height: 1000 }} />;
};

export default GraphGenerator;





/*import React, { useEffect, useRef, useCallback } from "react";
import { Graphviz } from "graphviz-react";
import { graphviz } from "d3-graphviz";

export default ({ dot, width, height }) => {
  // gen css from props
  const style = {
    width: width || "100%",
    height: height || "100%"
  };
  const graphvizRoot = useRef(null);

  // update style in Graphviz div
  useEffect(() => {
    if (graphvizRoot.current) {
      const { id } = graphvizRoot.current;
      // use DOM id update style
      const el = document.getElementById(id);
      for (let [k, v] of Object.entries(style)) {
        el.style[k] = v;
      }
      graphviz(`#${id}`);
    }
  }, [graphvizRoot]);
  const reset = useCallback(() => {
    if (graphvizRoot.current) {
      const { id } = graphvizRoot.current;
      graphviz(`#${id}`).resetZoom();
    }
  }, [graphvizRoot]);
  return (
    <div
      style={{
        ...style,
        position: "relative"
      }}
    >
      {dot !== ""
        ? [
            <Graphviz
              dot={dot}
              options={{
                useWorker: false,
                ...style,
                zoom: true
                //...props
              }}
              ref={graphvizRoot}
            />,
            // reset button
            <button
              onClick={reset}
              style={{
                position: "absolute",
                right: "5%",
                top: "5%"
              }}
            >
              Reset
            </button>
          ]
        : null}
    </div>
  );
};*/


