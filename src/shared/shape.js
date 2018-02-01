import PropTypes from 'prop-types'

export const HomeworkShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  homework: {
    id: PropTypes.string.isRequired,
    candidate: PropTypes.string.isRequired,
    job_role: PropTypes.string.isRequired,
  },
  interviewer: {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    employee_id: PropTypes.string.isRequired,
  },
  assigned_date: PropTypes.instanceOf(Date).isRequired,
  deadline_date: PropTypes.instanceOf(Date).isRequired,
  finished_date: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.string.isRequired,

})

export const InterviewerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  profile_pic: PropTypes.string,
  created_date: PropTypes.string,
})

