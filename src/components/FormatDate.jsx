
function calculateDaysAgo(targetTime) {
  const currentTime = new Date();
  const targetDateTime = new Date(targetTime);
  const timeDiff = currentTime - targetDateTime;
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysAgo;
}

function FormatDate(targetTime) {
  const daysAgo = calculateDaysAgo(targetTime);

  if (daysAgo === 0) {
    return '오늘';
  } else if (daysAgo === 1) {
    return '어제';
  } else if (daysAgo < 30) {
    return `${daysAgo}일 전`;
  } else if (daysAgo >= 30 && daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${monthsAgo}달 전`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo}년 전`;
  }
}

export default FormatDate;