import PropTypes from 'prop-types'

export const AssignmentShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  candidate: PropTypes.string.isRequired,
  job_role: PropTypes.string.isRequired,
  interviewer_employee_id: PropTypes.string.isRequired,
  interviewer_name: PropTypes.string.isRequired,
  assigned_date: PropTypes.string.isRequired,
  deadline_date: PropTypes.string.isRequired,
  finished_date: PropTypes.string,
  status: PropTypes.string.isRequired,
  is_finished: PropTypes.bool.isRequired,
})

export const InterviewerShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  profile_pic: PropTypes.string,
  created_date: PropTypes.string,
})

