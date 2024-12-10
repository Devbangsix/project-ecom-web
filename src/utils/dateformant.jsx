import moment from 'moment/min/moment-with-locales'

export const dateFormat = (date) => {
    return moment(date).locale('eng').format('LL')
}