import moment from 'moment'

export default date => (date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '')
