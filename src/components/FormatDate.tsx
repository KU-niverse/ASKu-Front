

function FormatDate(targetTime: any) {
  const utcDate = new Date(targetTime);

  // UTC 시간에 9시간을 더한 후 시간을 표시
  utcDate.setHours(utcDate.getHours() + 9);
  const formattedDate = utcDate.toISOString().replace("T", " ").replace(".000Z", "").replace(/-/g, ".");

  return formattedDate;
}


export default FormatDate;
