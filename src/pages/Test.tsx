import React, { Component } from "react";
// @ts-expect-error TS(6142): Module '../components/ThreedotsMenu' was resolved ... Remove this comment to see the full error message
import ThreedotsMenu from "../components/ThreedotsMenu";

function Test(){

  
  return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div><ThreedotsMenu/>
    </div>
  )
};

export default Test;