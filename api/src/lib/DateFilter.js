export class DateFilter {
  startDate
  endDate

  constructor(date) {
    if (date) {
      this.reset(date)
    }
  }

  reset(date) {
    this.setStartDate(date)
    this.setEndDate(date)
  }

  setStartDate(date) {
    this.startDate = new Date(date)
    this.startDate.setUTCHours(0, 0, 0, 0)
  }

  setEndDate(date) {
    this.endDate = new Date(date)
    this.endDate.setUTCHours(23, 59, 59, 999)
  }
}
