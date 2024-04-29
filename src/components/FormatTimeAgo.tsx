

function FormatTimeAgo (time: any) {
    function formatDiff(timeDifference: any) {
    
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
        if (daysAgo >= 1) {
          return `${daysAgo}일 전`;
        } else {
          const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
          if (hoursAgo >= 1) {
            return `${hoursAgo}시간 전`;
          } else {
            const minutesAgo = Math.floor(timeDifference / (1000 * 60));
            return `${minutesAgo}분 전`;
          }
        }
    }

    const inputDate = new Date(time);
    const currentDate = new Date();
        const timeDifference = Math.abs(currentDate - inputDate);
    const timestamp = formatDiff(timeDifference);

    return timestamp;

}

export default FormatTimeAgo;