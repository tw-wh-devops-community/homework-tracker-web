const adminReducer = (state = {
  homework: {}
}, action)=> {
  switch (action.type) {
    case 'FETCH_HOMEWORK':
    {
      const homework = action.payload.homework
      return {...state, homework}
    }
    default:
      return state
  }
}

export default adminReducer