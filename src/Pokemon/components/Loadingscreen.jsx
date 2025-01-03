import React, { useRef, useEffect, useState, forwardRef } from 'react';

const Loadingscreen = ({percent}) => {
    console.log("loading")
  return (
<div style={{width: "100vw", height: "100vh", backgroundColor: "black"}}>
<div style={{marginLeft: "auto", marginRight: "auto", fontSize: "100px", display: "flex", alignItems: "center", justifyContent: "center", height: "inherit", width: "fit-content", color: "white"}}>
    {Math.trunc(percent)}%</div>
          
</div>
  );
};

export default Loadingscreen;
