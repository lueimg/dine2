
import moment from 'moment';

const format = "YYYY-MM-DD";
const startDate = moment([moment().year(),moment().month() ])
const endDate = moment(startDate).endOf('month')

export const today = moment().format(format);
export const yesterday = moment().add(-1, 'days').format(format)
export const startDateDisplay = startDate.format(format)
export const endDateDisplay = endDate.format(format)

export const getDateDisplay = (date) => {
    return moment(date).format('dddd, Do')
}
export const now = () => {
    return moment().valueOf();
}

export const getDateUnix = (dateDisplay) => {
    return moment(dateDisplay).valueOf()
}