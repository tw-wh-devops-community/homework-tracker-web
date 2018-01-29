import PropTypes from 'prop-types'

export const HomeworkShape = PropTypes.shape({
  homework_id: PropTypes.string.isRequired,
  interviewer_id: PropTypes.string.isRequired,
  interviewer: PropTypes.string.isRequired,
  candidate: PropTypes.string.isRequired,
  job_role: PropTypes.string.isRequired,
  assigned_date: PropTypes.string.isRequired,
  deadline_date: PropTypes.string.isRequired,
  finished_date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
})

export const InterviewerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  profile_pic: PropTypes.string,
  created_date: PropTypes.string,
})

