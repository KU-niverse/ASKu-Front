import React from "react";
import haho from "../img/haho.png";
import threedots from "../img/threedots.png"
import styles from "./Badge.module.css"

function Badge(){
  return(
    <div className={styles.b_container}> 
      <div className={styles.b_content}>
        <div className={styles.b_thumb}>
          <img src={haho} alt="haho"/>
        </div>
        <div className={styles.b_right}>
          <div className={styles.b_listhead}>
            <span className={styles.b_listfronthead}>출석 1단계</span>
            <img src={threedots} alt="threedots"/>
          </div>
          <div className={styles.b_listmid}>
            <p className={styles.midtext}>내가 그린 기린 그림은 뭐시라 깨시라 아무튼 긴 글 아무거나</p>
          </div>
          <div className={styles.b_listfoot}>
            <span className={styles.b_listfrontfoot}>
              뱃지 달성자 수 : 1000명
            </span>
            <span className={styles.b_listlastfoot}>
              획득 일자 : 2023. 06. 10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badge;