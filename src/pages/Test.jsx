import React, { Component } from "react";
import Graph from "../components/Graph";

function Test(){
  const data = [
    { name: "입실렌티",
      value: 40, 
      description: "40%", 
      color: "rgba(251, 108, 108, 1)"},
    { name: "수강신청",
      value: 30, 
      description: "30%", 
      color: "rgba(255, 214, 0, 1)"},
    { name: "고연전",
      value: 16, 
      description: "16%", 
      color: "rgba(251, 193, 108, 1)"},
    { name: "기타",
      value: 14, 
      description: "14%", 
      color: "rgba(217, 217, 217, 1)"},
  ];
  
  return(
    <div><Graph data={data}/>
    </div>
  )
};

export default Test;