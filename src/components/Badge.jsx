import React from "react";
import haho from "../img/haho.png";
import threedots from "../img/threedots.png"

function Badge(){
  return(
    <div> 
      <div>
        <div>
          <img src={haho} alt="haho"/>
        </div>
        <div>
          <span>출석 1단계</span>
          <img src={threedots} alt="threedots"/>
        </div>
        <div>
          <span>똑똑똑... 여기가 ASKu인가요?</span>
        </div>
        <div>
          <span>
            뱃지 달성자 수 : 1000명
          </span>
          <span>
            획득 일자 : 2023. 06. 10
          </span>
        </div>
      </div>
    </div>
  );
};

export default Badge;