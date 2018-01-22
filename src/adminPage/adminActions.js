export function fetchHomework(request) {
  
  return {
    type: 'FETCH_HOMEWORK',
    payload: request.data
  }
}