import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
import styles from "./Graph.module.css"

function Graph({data}) {

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



