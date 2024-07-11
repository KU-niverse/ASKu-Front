function FormatTimeAgo(time: string | number | Date) {
  function formatDiff(timeDifference: number) {
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (daysAgo >= 1) {
      return `${daysAgo}일 전`
    }
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60))
    if (hoursAgo >= 1) {
      return `${hoursAgo}시간 전`
    }
    const minutesAgo = Math.floor(timeDifference / (1000 * 60))
    return `${minutesAgo}분 전`
  }

  const inputDate = new Date(time)
  const currentDate = new Date()
  const timeDifference = Math.abs(currentDate.getTime() - inputDate.getTime())
  const timestamp = formatDiff(timeDifference)

  return timestamp
}

export default FormatTimeAgo
