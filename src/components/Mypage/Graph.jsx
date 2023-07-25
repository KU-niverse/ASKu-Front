import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
import styles from "./Graph.module.css"


function Graph() {
  const data = [
    {
      name: "입실렌티",
      value: 40,
      description: "40%",
      color: "rgba(251, 108, 108, 1)",
    },
    {
      name: "수강신청",
      value: 30,
      description: "30%",
      color: "rgba(255, 214, 0, 1)",
    },
    {
      name: "고연전",
      value: 16,
      description: "16%",
      color: "rgba(251, 193, 108, 1)",
    },
    {
      name: "기타",
      value: 14,
      description: "14%",
      color: "rgba(217, 217, 217, 1)",
    },
  ];
  
    return (
      <div className={styles.g_container}>
        <p className={styles.g_name}>문서별 기여도</p>
        <HSBar 
          height={22}
          data={data}
          outlineWidth={0.2}
          outlineColor = "white"
        />
      <div className={styles.legend}>
        {data.map((item, index) => (
          <div className={styles.legendItem} key={index}>
            <div className={styles.legendColor} style={{ background: item.color }}></div>
            <div className={styles.legendLabel}>
              <span className={styles.legendname}>{item.name}</span> 
              <span className={styles.legendper}> {item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }

export default Graph;



