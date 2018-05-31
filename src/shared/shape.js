import PropTypes from 'prop-types'

export const AssignmentLogShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  operate_action: PropTypes.number.isRequired,
  operate_time: PropTypes.string.isRequired,
  operate_context: PropTypes.string.isRequired,
})

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

export const InterviewerOptionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
})

export const RoleOptionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
})

export const BulletinShape = PropTypes.shape({
  interviewer_employee_id: PropTypes.string.isRequired,
  interviewer_name: PropTypes.string.isRequired,
  interviewer_profile: PropTypes.string,
  interviewer_role: PropTypes.string.isRequired,
  time_records: PropTypes.array.isRequired,
})

export const HonorRollShape = PropTypes.shape({
  interviewer_employee_id: PropTypes.string.isRequired,
  interviewer_name: PropTypes.string.isRequired,
  interviewer_profile: PropTypes.string,
  interviewer_role: PropTypes.string.isRequired,
  avg_duration: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
})

