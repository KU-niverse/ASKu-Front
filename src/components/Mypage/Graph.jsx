import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
import styles from "./Graph.module.css"


function Graph({ total_point, docs }) {

  const getColor = (index) => {
    const colors = [
      "rgba(251, 108, 108, 1)",
      "rgba(255, 214, 0, 1)",
      "rgba(251, 193, 108, 1)",
      "rgba(217, 217, 217, 1)",
    ];
  
    // Ensure index is within the valid range
    const validIndex = Math.min(Math.max(index, 0), colors.length - 1);
  
    return colors[validIndex];
  };

  // Calculate contributions and sort them
  const contributions = docs.map((doc) => ({
    name: doc.doc_title,
    value: (doc.doc_point / total_point) * 100,
    description: `${((doc.doc_point / total_point) * 100).toFixed(2)}%`,
    // color: getColor(doc.doc_title),
  }));

  // Sort contributions by value in descending order
  contributions.sort((a, b) => b.value - a.value);

  // Select top 3 contributions, and calculate the "Other" contribution
  const topContributions = contributions.slice(0, 3);

  // Apply colors to top contributions based on their position
  topContributions.forEach((contribution, index) => {
    contribution.color = getColor(index); // Assuming getColor function returns appropriate colors
  });



  let otherContributionValue = 0;
  contributions.slice(3).forEach((contribution) => {
    otherContributionValue += contribution.value;
  });
  topContributions.push({
    name: "기타",
    value: otherContributionValue,
    description: `${otherContributionValue.toFixed(2)}%`,
    color: getColor(3),
  });

 
  return (
    <div className={styles.g_container}>
      <p className={styles.g_name}>문서별 기여도</p>
      <HSBar
        height={22}
        data={topContributions}
        outlineWidth={0.2}
        outlineColor="white"
      />
      <div className={styles.legend}>
        {topContributions.map((item, index) => (
          <div className={styles.legendItem} key={index}>
            <div
              className={styles.legendColor}
              style={{ background: item.color }}
            ></div>
            <div className={styles.legendLabel}>
              <span className={styles.legendname}>{item.name}</span>
              <span className={styles.legendper}> {item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Graph;
