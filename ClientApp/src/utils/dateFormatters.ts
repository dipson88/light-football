const dateFormatters = {
  toLocaleDate (dateString: string) {
    const date = new Date(dateString)

    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: false
    })
  }
}

export default dateFormatters
