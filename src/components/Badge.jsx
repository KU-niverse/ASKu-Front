import React from "react";
import haho from "../img/haho.png";
import styles from "./Badge.module.css"
import ThreedotsBadge from "./ThreedotsBadge"

function Badge({id, name, image, description, event, cont}){

  const formatTime = (rawTime) => {
    const dateObj = new Date(rawTime);
    return `${dateObj.getFullYear()}. ${String(dateObj.getMonth() + 1).padStart(2, '0')}. ${String(dateObj.getDate()).padStart(2, '0')}`;
  };
  //포맷팅 함수
  const time= "2021-05-20T14:48:00.000Z"
  return(
    <div className={styles.b_container}> 
      <div className={styles.b_content}>
        <div className={styles.b_thumb}>
          <img src={image} alt={name}/>
        </div>
        <div className={styles.b_right}>
          <div className={styles.b_listhead}>
            <span className={styles.b_listfronthead}>{name}</span>
            <ThreedotsBadge badge_id={name}/> 
         </div>
          <div className={styles.b_listmid}>
            <p className={styles.midtext}>{description}</p>
          </div>
          <div className={styles.b_listfoot}>
            <span className={styles.b_listfrontfoot}>
              달성자 수 : {cont}명
            </span>
            <span className={styles.b_listlastfoot}>
              획득일 : {formatTime(time)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badge;